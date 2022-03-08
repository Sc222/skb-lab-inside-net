import React, { FunctionComponent, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CustomToolbar } from "./customToolbar";
import { getDefaultItems, Sidebar } from "./sidebar";
import { useAuthContext } from "../../Contexts/authContext";
import { PersonModel } from "../../Api/Models/personModel";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

interface LayoutProps {}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const auth = useAuthContext();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [personInfoForLayout, setPersonInfoForLayout] = useState<Pick<PersonModel, "avatarUrl" | "fullName"> | null>(
    null
  );

  // must be memoized callback
  //todo FIX REACT LEAK
  //todo use useCallback + useEffect
  useEffect(() => {
    const getPersonInfoForLayout = async () => {
      await auth.getPersonInfo((result) => {
        if (result.success) {
          setPersonInfoForLayout(result.success);
        } else {
          setPersonInfoForLayout(null);
        }
      });
    };
    getPersonInfoForLayout();
  });

  // if no person - do not render anything, how to fix this?
  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <CustomToolbar
        onSidebarOpen={() => setSidebarOpen(true)}
        avatarUrl={personInfoForLayout?.avatarUrl}
        fullName={personInfoForLayout?.fullName}
      />

      {/* fixme refactor dynamic items loading */}
      <Sidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        items={auth.authInfo?.personId ? getDefaultItems(auth.authInfo?.personId) : undefined}
      />
    </>
  );
};
