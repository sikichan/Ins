import { bottomBarLinks } from '@/constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BottomBar = () => {
  const { t } = useTranslation();
  return (
    <div className="bottom-bar">
      {bottomBarLinks.map((item) => {
        const isActive = location.pathname === item.route;
        return (
          <Link
            to={item.route}
            key={item.label}
            className={`bottombar-link group ${isActive && 'bg-primary'} rounded-[10px] flex-center flex-col p-2 transition`}
          >
            <img src={item.imgURL} alt={item.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
            <p className="tiny-medium text-white">{t(`mini.${item.label}`)}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;
