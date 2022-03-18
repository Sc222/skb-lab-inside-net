import React, { FunctionComponent } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { SearchInput } from "./searchInput";
import { ToolbarProfileMenu } from "./toolbarProfileMenu";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { useMatch } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { NotificationsMenu } from "./notificationsMenu";

const CustomToolbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

interface CustomToolbarProps {
  onSidebarOpen: () => void;
  avatarUrl?: string;
  fullName?: string;
}

export const CustomToolbar: FunctionComponent<CustomToolbarProps> = ({
  onSidebarOpen,
  avatarUrl,
  fullName,
  ...other
}) => {
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const isSearchPage = useMatch(`${SiteRoute.persons}/${SiteRoute.search}`) !== null;

  const setProfileMenuAnchor = (event: React.MouseEvent<HTMLElement>) => {
    if (!profileMenuAnchorEl) {
      setProfileMenuAnchorEl(event.currentTarget);
    }
  };

  const resetProfileMenuAnchor = () => {
    setProfileMenuAnchorEl(null);
  };

  const setNotificationMenuAnchor = (event: React.MouseEvent<HTMLElement>) => {
    if (!notificationMenuAnchorEl) {
      setNotificationMenuAnchorEl(event.currentTarget);
    }
  };

  const resetNotificationMenuAnchor = () => {
    setNotificationMenuAnchorEl(null);
  };

  return (
    <>
      <CustomToolbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
              mr: { xs: 1.5, lg: 0 },
            }}
          >
            <MenuOutlinedIcon fontSize="small" />
          </IconButton>
          {!isSearchPage && <SearchInput />}
          <Box sx={{ flexGrow: 1, ml: 1.5 }} />
          <Tooltip title="Уведомления">
            <IconButton onClick={setNotificationMenuAnchor}>
              {/*todo notifications badge and menu*/}
              {/* <Badge badgeContent={undefined} color="primary" variant="dot">
                <NotificationsOutlinedIcon fontSize="small" />
              </Badge>*/}
              <NotificationsOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <NotificationsMenu
            onClose={resetNotificationMenuAnchor}
            anchorEl={notificationMenuAnchorEl}
            notifications={[]}
          />

          <Avatar
            sx={(theme) => ({
              height: 40,
              width: 40,
              ml: 1,
              fontSize: "24px",
              border: `solid 1px ${theme.palette.primary.main}`,
              background: theme.palette.background.paper,
            })}
            src={avatarUrl}
            onClick={setProfileMenuAnchor}
          >
            <Person color="primary" fontSize="inherit" />
          </Avatar>
          <ToolbarProfileMenu
            onClose={resetProfileMenuAnchor}
            anchorEl={profileMenuAnchorEl}
            avatarUrl={avatarUrl}
            fullName={fullName}
          />
        </Toolbar>
      </CustomToolbarRoot>
    </>
  );
};
