import React, { FunctionComponent } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { SearchInput } from "./searchInput";
import { ToolbarProfileMenu } from "./toolbarProfileMenu";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { useMatch } from "react-router-dom";

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

  const isSearchPage = useMatch(`${SiteRoute.home}/${SiteRoute.persons}/${SiteRoute.search}`) !== null;

  const setProfileMenuAnchor = (event: React.MouseEvent<HTMLElement>) => {
    if (!profileMenuAnchorEl) {
      setProfileMenuAnchorEl(event.currentTarget);
    }
  };

  const resetProfileMenuAnchor = () => {
    setProfileMenuAnchorEl(null);
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
            <IconButton>
              {/*todo notifications badge and menu*/}
              <Badge badgeContent={undefined} color="primary" variant="dot">
                <NotificationsOutlinedIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src={avatarUrl}
            onClick={setProfileMenuAnchor}
          >
            <AccountCircleOutlinedIcon fontSize="small" />
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
