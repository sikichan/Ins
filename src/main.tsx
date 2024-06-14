import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import AuthContextProvider from '@/context/AuthContext.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';

const queryClient = new QueryClient();
ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <App />
          <Toaster />
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
