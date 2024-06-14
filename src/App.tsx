import './index.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import SignInForm from '@/scenes/_auth/SignInForm.tsx';
import SignUpForm from '@/scenes/_auth/SignUpForm.tsx';
import AuthLayout from '@/scenes/_auth/AuthLayout.tsx';
import RootLayout from '@/scenes/_root/RootLayout.tsx';
import { useAuthContext } from '@/context/AuthContext.tsx';

const App = () => {
  const { isAuthenticated } = useAuthContext();
  console.log(isAuthenticated);
  return (
    <main className="app flex h-screen">
      <Routes>
        {/*  Public */}
        <Route element={<AuthLayout />}>
          <Route
            path="/sign-in"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <SignInForm />
              )
            }
          />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/*  Private */}
        <Route path="/" element={<RootLayout />}></Route>
      </Routes>
    </main>
  );
};

export default App;
