import * as React from "react";
import { Outlet } from "react-router-dom";

interface SpecificPersonPageProps {}
/*TODO: CONTEXT WITH USER INFO HERE !!!*/

export const SpecificPersonPage: React.FunctionComponent<SpecificPersonPageProps> = () => {
  return (
    <div>
      SPECIFIC PERSON PAGE (remove it and leave only outlet) <Outlet />
    </div>
  );
};
