import React, { FunctionComponent, PropsWithChildren } from "react";
import { Box } from "@mui/material";

interface PersonPageContainerProps {}

export const PersonPageContainer: FunctionComponent<PropsWithChildren<PersonPageContainerProps>> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        flexGrow: 1,
        [theme.breakpoints.down("md")]: {
          py: 4,
        },
        [theme.breakpoints.up("md")]: {
          py: 8,
        },
      })}
    >
      {children}
    </Box>
  );
};
