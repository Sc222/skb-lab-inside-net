import React, { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
  children?: React.ReactNode;
  name: string;
  value: string;
}

//TODO rewrite using TS
export function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, name, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== name}
      id={`simple-tabpanel-${name}`}
      aria-labelledby={`simple-tab-${name}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === name && children}
    </div>
  );
}

interface SlackChannelsToolbar {}

export const SlackChannelsToolbar: FunctionComponent<SlackChannelsToolbar> = () => {
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Slack каналы
        </Typography>
        {/* <Box sx={{ m: 1 }}>
          <Link component={RouterLink} to={`${SiteRoute.persons}/${SiteRoute.search}`}>
            <Button color="primary" variant="contained" size="medium">
              Глобальный поиск
            </Button>
          </Link>
        </Box>*/}
      </Box>
    </>
  );
};
