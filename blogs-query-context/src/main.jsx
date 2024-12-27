import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import App from './App.jsx';
import { NotificationContextProvider } from './context/NotificationContext.jsx';
import { UserContextProvider } from './context/UserContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserContextProvider>
  </NotificationContextProvider>
);
