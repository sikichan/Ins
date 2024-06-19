import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContextProvider from '@/context/AuthContext.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';
import { ThemeProvider } from '@/hooks/useThemeContext.tsx';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme={'system'} storageKey="vite-ui-theme">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <App />
            <Toaster />
          </AuthContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
