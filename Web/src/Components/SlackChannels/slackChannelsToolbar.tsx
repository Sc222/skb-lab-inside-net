import React, { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//TODO rewrite using TS
export function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
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
