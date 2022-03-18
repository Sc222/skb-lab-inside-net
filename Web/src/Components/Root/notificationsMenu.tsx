import React, { Fragment, FunctionComponent } from "react";
import { Divider, ListItemIcon, Menu, MenuList } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { HourglassEmptyOutlined } from "@mui/icons-material";
import { NotificationModel } from "../../Api/Models/notificationModel";

interface NotificationsMenuProps {
  anchorEl: null | HTMLElement;
  onClose: (event: any, reason: string) => void;
  notifications: NotificationModel[];
}

export const NotificationsMenu: FunctionComponent<NotificationsMenuProps> = ({
  anchorEl,
  onClose,
  notifications = [],
}) => {
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
      <MenuList>
        {notifications.length === 0 && (
          <MenuItem>
            <ListItemIcon>
              <HourglassEmptyOutlined fontSize="small" />
            </ListItemIcon>
            Уведомлений нет
          </MenuItem>
        )}

        {/* FIXME: better render of notification elements */}
        {notifications.map((n, i, arr) => (
          <Fragment key={n.id}>
            <MenuItem>
              {/*<ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>*/}
              <b>{n.title}</b>
              {n.text}
              {n.date}
            </MenuItem>
            {i !== arr.length - 1 && <Divider />}
          </Fragment>
        ))}
      </MenuList>
    </Menu>
  );
};
