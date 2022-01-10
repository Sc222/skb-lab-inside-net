import React, { FunctionComponent } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const CustomToolbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

interface CustomToolbarProps {
  onSidebarOpen: () => void;
  avatarUrl?: string;
}

export const CustomToolbar: FunctionComponent<CustomToolbarProps> = ({ onSidebarOpen, avatarUrl, ...other }) => {
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
            }}
          >
            <MenuOutlinedIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Уведомления">
            <IconButton sx={{ ml: 1 }}>
              {/*todo notifications badge and menu*/}
              <Badge badgeContent={undefined} color="primary" variant="dot">
                <NotificationsOutlinedIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {/*todo avatar menu*/}
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src={avatarUrl}
          >
            <AccountCircleOutlinedIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </CustomToolbarRoot>
    </>
  );
};
