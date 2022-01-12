import React, { FunctionComponent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Avatar, Divider, ListItemIcon, Menu, MenuList } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { LogoutOutlined } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAuthContext } from "../../Contexts/authContext";
import { SiteRoute } from "../../Typings/Enums/siteRoute";

interface ToolbarProfileMenuProps {
  anchorEl: null | HTMLElement;
  onClose: (event: any, reason: string) => void;
  avatarUrl?: string;
  fullName?: string;
}

export const ToolbarProfileMenu: FunctionComponent<ToolbarProfileMenuProps> = ({
  anchorEl,
  onClose,
  avatarUrl,
  fullName,
}) => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut(() => {
      /*do nothing*/
      navigate(SiteRoute.home);
    });
  };

  return (
    <Menu
      autoFocus={false}
      disableAutoFocus
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      onClick={(e) => onClose(e, "click")}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {auth.authInfo && (
        <MenuList>
          <MenuItem component={RouterLink} to={`${auth.authInfo.personId}/${SiteRoute.profile}`}>
            <Avatar
              sx={{
                height: 32,
                width: 32,
                ml: 1,
                fontSize: "20px",
              }}
              src={avatarUrl}
            >
              <AccountCircleOutlinedIcon color="primary" fontSize="inherit" />
            </Avatar>
            {fullName ?? "Меню профиля"}
          </MenuItem>
          <Divider />

          <MenuItem component={RouterLink} to={`${auth.authInfo.personId}/${SiteRoute.settings}`}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Настройки
          </MenuItem>
        </MenuList>
      )}
      <MenuItem onClick={signOut}>
        <ListItemIcon>
          <LogoutOutlined fontSize="small" />
        </ListItemIcon>
        Выход
      </MenuItem>
    </Menu>
  );
};
