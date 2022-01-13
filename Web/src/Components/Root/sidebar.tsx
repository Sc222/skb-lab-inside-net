import React, { FunctionComponent, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import LogoAccent from "./../../assets/logo-accent.png";
import { NavItem } from "./navItem";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { AppTheme } from "../../appTheme";
import { SlackOutlined } from "../Icons/slackOutlined";

//todo ref should be based on user id
// TODO make sidebarItems dynamic
export const getDefaultItems = (personId: string): { to: string; icon: ReactNode; title: string }[] => [
  {
    to: `${personId}/${SiteRoute.profile}`,
    icon: <PersonOutlinedIcon fontSize="small" />,
    title: "Профиль",
  },
  {
    to: `${personId}/${SiteRoute.contacts}`,
    icon: <PeopleOutlinedIcon fontSize="small" />,
    title: "Контакты",
  },
  {
    to: `${personId}/${SiteRoute.slackChannels}`,
    icon: <SlackOutlined fontSize="small" />,
    title: "Slack каналы",
  },
  {
    to: `${personId}/${SiteRoute.calendar}`,
    icon: <TodayOutlinedIcon fontSize="small" />,
    title: "Календарь",
  },
  {
    to: `${personId}/${SiteRoute.settings}`,
    icon: <SettingsOutlinedIcon fontSize="small" />,
    title: "Настройки",
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  items?: { to: string; icon: ReactNode; title: string }[];
}

export const Sidebar: FunctionComponent<SidebarProps> = ({ open, onClose, items }) => {
  const lgUp = useMediaQuery((theme: AppTheme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const onNavItemClick = () => {
    if (open) {
      onClose?.();
    }
  };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ pt: 3, px: 3, display: "flex", alignItems: "center", justifyContent: "start" }}>
          <RouterLink to={SiteRoute.home} style={{ lineHeight: "1em" }}>
            <Box
              component="img"
              sx={{
                height: 42,
                width: 42,
                maxHeight: { xs: 42, md: 42 },
                maxWidth: { xs: 42, md: 42 },
              }}
              alt="Логотип компании"
              src={LogoAccent}
            />
          </RouterLink>
          <Typography color="inherit" variant="h5" sx={{ ml: 3 }}>
            Inside Net
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: "sidebar.700",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items?.map((item) => (
            <NavItem onClick={onNavItemClick} key={item.title} icon={item.icon} to={item.to} title={item.title} />
          ))}
        </Box>
      </Box>
    </>
  );

  // Responsive drawer
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#0F2027",
            background: "linear-gradient( 109.6deg,  rgba(20,30,48,1) 11.2%, rgba(36,59,85,1) 91.1% )",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#0F2027",
          background: "linear-gradient( 109.6deg,  rgba(20,30,48,1) 11.2%, rgba(36,59,85,1) 91.1% )",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
