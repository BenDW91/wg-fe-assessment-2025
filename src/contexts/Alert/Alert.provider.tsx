import { Alert, Fade } from '@mui/material';

import {
   FC, Fragment, useCallback, useEffect, useMemo, useState,
} from 'react';
import AlertContainer from './AlertProvider.style';
import { v4 as uuidv4 } from 'uuid';
import { AlertProviderProps, AlertType } from './Alert.type';
import { AlertContext } from './Alert.context';

export const AUTO_DISMISS: number = 5000;


export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  useEffect(() => {
    const storageAlerts = sessionStorage.getItem('alerts');

    if (storageAlerts) {
      setAlerts(JSON.parse(storageAlerts));
    }

    // clean up the alerts when the Alertprovider is destroyed
    return () => {
      sessionStorage.removeItem('alerts');
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('alerts', JSON.stringify(alerts.filter(alert => alert.status && alert.status >= 300)));
  }, [alerts]);


  const removeAlert = useCallback((index: number) => {
    setAlerts((oldAlerts) => {
      const newAlerts = [...oldAlerts];
      newAlerts[index].isVisible = false;
      return newAlerts;
    });
  }, []);

  const setTimedRemovalFor = useCallback((id: string) => {
    const timer = setTimeout(() => {
      setAlerts((oldAlerts) => {
        const newAlerts = [...oldAlerts];
        const index = newAlerts.findIndex((alert) => alert.id === id);
        const status = newAlerts[index].status;
        if (status && status < 500) {
          newAlerts[index].isVisible = false;
        }
        return newAlerts;
      });

      clearTimeout(timer);
    }, AUTO_DISMISS);
  }, []);

  const addAlert = useCallback((message: string, err: AlertType) => {
    const id = uuidv4();
    let newAlert: AlertType = {
      ...err,
      id,
      isVisible: true,
      message: 'Something went wrong.'
    }

    if (err.status && err.status <= 200) {
      newAlert = {
        ...newAlert,
        message: message,
      };
      setAlerts((oldAlerts) => [...oldAlerts, newAlert]);
      setTimedRemovalFor(id);
      return;
    }

    if (err.code && err.code === "ERR_NETWORK") {
      newAlert = {
        ...newAlert,
        message: 'Network error',
      }
    } else if (err.response?.data) {
      const { status } = err.response.data;

      newAlert = {
        ...newAlert,
        status,
        message: message,
      }
    }

    setAlerts((oldAlerts) => [...oldAlerts, newAlert]);
    setTimedRemovalFor(id);
  }, [setTimedRemovalFor]);

  const getAlertSeverity = useCallback((alert: AlertType) => {
    if (!alert.status) return 'error';

    if (alert.status < 300) {
      return 'success';
    }
    if (alert.status < 500) {
      return 'warning';
    }
    return 'error';
  }, []);

  const value = useMemo(() => ({ alerts, addAlert }), [alerts, addAlert]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertContainer spacing={2}>
        {
          alerts.map((alert, index) => (
            alert?.isVisible && (
              <Fragment key={alert.id}>
                <Fade in={alert.isVisible}>
                  <Alert
                    severity={getAlertSeverity(alert)}
                    sx={{ width: '100%' }}
                    onClose={() => removeAlert(index)}
                    data-testid="alert-popup"
                  >
                    {alert.message}
                  </Alert>
                </Fade>
              </Fragment>
            )
          ))
        }
      </AlertContainer>
    </AlertContext.Provider>
  );
};
