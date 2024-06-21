import './index.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import SignInForm from '@/_auth/SignInForm.tsx';
import SignUpForm from '@/_auth/SignUpForm.tsx';
import AuthLayout from '@/_auth/AuthLayout.tsx';
import RootLayout from '@/_root/RootLayout.tsx';
import { useAuthContext } from '@/context/AuthContext.tsx';
import { Home, Saved, AllUsers, EditPost, CreatePost, PostDetails, Profile, UpdateProfile, Explore } from '@/_root/pages';

const App = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <main className="app flex h-screen">
      <Routes>
        {/*  Public */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/" /> : <SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/*  Private */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
