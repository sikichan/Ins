import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <section className="flex flex-col flex-1 justify-center items-center">
        <Outlet />
      </section>
      <img src="/assets/side-img.svg" alt="logo" className="hidden xl:block w-1/2 h-screen bg-no-repeat object-cover" />
    </>
  );
};
export default AuthLayout;
