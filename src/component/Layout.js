import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import DesktopHeader from "./DesktopHeader";
import Header from "./Header";

const Layout = (props) => {
  const [isDashboard, setIsDashboard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.location) {
      if (window.location.pathname.includes("dashboard")) {
        setIsDashboard(true);
      }
    }

    if(window.innerWidth < 699){
      setIsMobile(true)
    }
  }, []);

  return (
    <>
      {isDashboard ? (
        <DashboardLayout>{props.children}</DashboardLayout>
      ) : (
        <div className="purple-bg ">
          {isMobile ? <Header /> : <DesktopHeader /> }
          {props.children}
        </div>
      )}
    </>
  );
};

export default Layout;
