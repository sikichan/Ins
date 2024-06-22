import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext.tsx';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Button } from '@/components/ui';
import { LogoutDialog } from '@/components/shared/index.ts';
import { useTranslation } from 'react-i18next';

const LeftSideBar = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex gap-1 items-cente  font-bold">
          <img src="/assets/logo.png" className="w-8 h-8 rounded-full" alt="logo" />
          InstagramClone
        </Link>
        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile" className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <p className="body-bold">{user.name}</p>
            <p className="text-light-3 small-regular">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((item: INavLink) => {
            const isActive = location.pathname === item.route;
            return (
              <li key={item.label} className={`leftsidebar-link group ${isActive && 'bg-primary'}`}>
                <Link to={item.route} className="flex gap-4 p-3 items-center">
                  <img src={item.imgURL} alt={item.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                  {t(item.label)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <LogoutDialog>
        <Button variant="ghost" className="shad-button_ghost">
          <img src="/assets/icons/logout.svg" alt="logout" />
          {t('logout')}
        </Button>
      </LogoutDialog>
    </nav>
  );
};

export default LeftSideBar;
