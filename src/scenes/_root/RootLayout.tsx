import { Button } from '@/components/ui/button.tsx';
import { useLogoutMutation } from '@/lib/react-query';

const RootLayout = () => {
  const { mutateAsync: logout } = useLogoutMutation();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <Button onClick={handleLogout}>Log out</Button>
    </>
  );
};
export default RootLayout;
