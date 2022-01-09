import * as React from "react";
import { Outlet } from "react-router-dom";
import { PersonContextProvider } from "../../Contexts/personContext";
import { useParams } from "react-router";
import { SiteRouteParam } from "../../Typings/Enums/siteRouteParam";

interface SpecificPersonPageProps {}

export const SpecificPersonPage: React.FunctionComponent<SpecificPersonPageProps> = () => {
  let params = useParams();
  let personId: string | null = params[SiteRouteParam.personId] ?? null;

  return (
    <PersonContextProvider personId={personId}>
      <div>
        SPECIFIC PERSON PAGE (remove it and leave only outlet) <Outlet />
      </div>
    </PersonContextProvider>
  );
};
