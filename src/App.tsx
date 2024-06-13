import { Routes, Route } from 'react-router-dom';
import SignInForm from '@/scenes/_auth/SignInForm.tsx';
import SignUpForm from '@/scenes/_auth/SignUpForm.tsx';
import Home from '@/scenes/_root/Home.tsx';
import AuthLayout from '@/scenes/_auth/AuthLayout.tsx';
import RootLayout from '@/scenes/_root/RootLayout.tsx';

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/*  Public */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/*  Private */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
