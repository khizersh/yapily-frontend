import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./DashboardLayout";

const Layout = (props) => {
  const [isDashboard, setIsDashboard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.location) {
      if (window.location.pathname.includes("dashboard")) {
        setIsDashboard(true);
      }
    }

    if (window.innerWidth < 699) {
      setIsMobile(true);
    }
  }, []);

  return (
    <>
      <div className="bg-grey">{props.children}</div>
    </>
  );
};

export default Layout;
