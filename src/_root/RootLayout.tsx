// import { Button } from '@/components/ui/button.tsx';
// import { useLogoutMutation } from '@/lib/react-query';
// import {useNavigate} from "react-router-dom";

import {BottomBar, LeftSideBar, TopBar} from "@/components/shared";
import {Outlet} from "react-router-dom";

const RootLayout = () => {

  return (
    <div className="w-full md:flex">
      <TopBar/>
      <LeftSideBar/>

      <section className="flex flex-1 h-full">
        <Outlet/>
      </section>

      <BottomBar/>
    </div>
  );
};
export default RootLayout;
