import React, { FunctionComponent, ReactNode } from "react";
import { Link, ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface ProfileContactItemProps {
  icon: ReactNode;
  link: string | undefined;
  text: string;
}

//TODO HELPER CLASS FOR CREATING SLACK, TELEGRAM LINKS AND OTHER...
export const ProfileContactItem: FunctionComponent<ProfileContactItemProps> = ({ icon, link, text }) => (
  <ListItem sx={{ py: 1 }} disablePadding>
    <ListItemIcon sx={{ minWidth: 0, pr: 2 }}>{icon}</ListItemIcon>
    <ListItemText
      primary={
        <>
          {link ? (
            <Link
              target="_blank"
              rel="noopener"
              href={link}
              variant="inherit"
              color="inherit"
              underline="hover"
              sx={{
                cursor: "pointer",
              }}
            >
              {text}
            </Link>
          ) : (
            <> {text}</>
          )}
        </>
      }
    />
  </ListItem>
);
