import React, { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "../Components/Root/layout";

interface AppPageProps {}

export const PersonsPage: FunctionComponent<AppPageProps> = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
