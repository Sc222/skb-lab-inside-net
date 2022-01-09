import React from "react";
import { Outlet } from "react-router-dom";

interface AppPageProps {}

export const PersonsPage: React.FunctionComponent<AppPageProps> = () => {
  return (
    <div>
      <div style={{ background: "red" }}>app page PERSONS</div>
      <Outlet />
    </div>
  );
};
