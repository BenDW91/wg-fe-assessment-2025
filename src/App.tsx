import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Routes from './pages/Routes';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import muiTheme from './theme/muiTheme';
import { ConfirmationProvider } from './contexts/ConfirmDialog';
import { AlertProvider } from 'contexts/Alert';

export const queryCache = new QueryCache();

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{ 
          body: { 
            width: "100vw",
            height: "100vh",
          }
        }}
      />
      <AlertProvider>
        <ConfirmationProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ConfirmationProvider>
      </AlertProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
}

export default App
