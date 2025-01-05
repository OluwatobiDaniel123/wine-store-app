import { Space } from "antd";

import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";

function Main() {
  return (
    <div className="">
      <AppHeader />
      <div className="flex justify-between bg-slate-200">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
  );
}
export default Main;
