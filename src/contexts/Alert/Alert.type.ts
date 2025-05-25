export interface AlertType {
  id?: string,
  status?: number,
  code?: string,
  message?: string,
  values?: { [key: string]: string },
  detail?: string,
  isVisible?: boolean,
  response?: {
    data?: {
      status: number,
      title: string,
    },
  }
}

export interface ContextProps {
  alerts: AlertType[],
  addAlert: (message: string, err: AlertType) => void
}

export interface AlertProviderProps {
  children: React.ReactNode,
  errorClick?: (alert: AlertType) => void,
}
