import React, { FunctionComponent, MouseEventHandler } from "react";
import { Box, Button, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";

/**
 * 'to' can be relative or absolute
 */
interface NavItemProps {
  onClick?: MouseEventHandler;
  to: string;
  title: string;
  icon: React.ReactNode;
}

export const NavItem: FunctionComponent<NavItemProps> = ({ onClick, to, icon, title, ...others }) => {
  return (
    <ListItem
      onClick={onClick}
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      {/*TODO USE Router v6 NAVLINK FOR STYLING HERE !!!*/}
      <NavLink to={to} style={{ display: "block", width: "100%" }}>
        {({ isActive }) => {
          return (
            <Button
              component="a"
              startIcon={icon}
              disableRipple
              sx={{
                backgroundColor: isActive ? "rgba(255,255,255, 0.1)" : undefined,
                borderRadius: 1,
                color: isActive ? "secondary.light" : "sidebar.100",
                fontWeight: isActive ? "fontWeightBold" : undefined,
                justifyContent: "flex-start",
                px: 3,
                textAlign: "left",
                textTransform: "none",
                width: "100%",
                "& .MuiButton-startIcon": {
                  color: isActive ? "secondary.light" : "sidebar.200",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255, 0.09)",
                },
              }}
            >
              <Box sx={{ flexGrow: 1 }}>{title}</Box>
            </Button>
          );
        }}
      </NavLink>
    </ListItem>
  );
};
