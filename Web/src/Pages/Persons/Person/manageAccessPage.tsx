import React, { FunctionComponent, useEffect } from "react";
import Box from "@mui/material/Box";
import { AuthScope } from "../../../Typings/Enums/authScope";
import { useAuthContext } from "../../../Contexts/authContext";
import { SlackChannelsToolbar, TabPanel } from "../../../Components/SlackChannels/slackChannelsToolbar";
import { Card, CardContent, CardHeader, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MySlackChannels } from "../../../Components/SlackChannels/mySlackChannels";

interface ManageAccessPageProps {}

export const ManageAccessPage: FunctionComponent<ManageAccessPageProps> = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [authProfileScope, setAuthProfileScope] = React.useState<AuthScope | null>(null);
  const auth = useAuthContext();

  // must be memoized callback
  //todo FIX REACT LEAK
  //todo use useCallback + useEffect
  useEffect(() => {
    const getAuthScope = async () => {
      await auth.getAuthScope((result) => {
        if (result.success) {
          setAuthProfileScope(result.success);
        } else {
          setAuthProfileScope(AuthScope.unknown);
        }
      });
    };
    getAuthScope();
  }, []);

  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const generateTabProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <SlackChannelsToolbar />

        <Box sx={{ width: "100%", mt: 3 }}>
          <Card>
            <CardContent sx={{ px: 1, py: "0 !important" }}>
              <Box sx={{ py: 1 }}>
                <Tabs value={currentTab} onChange={onTabChange} aria-label="basic tabs example">
                  <Tab label="Мои каналы" {...generateTabProps(0)} />
                  <Tab label="Запрос доступа" {...generateTabProps(1)} />
                  {authProfileScope === AuthScope.slackAdmin && (
                    <Tab label="Выдача доступа" {...generateTabProps(2)} />
                  )}
                </Tabs>
              </Box>
            </CardContent>
            <CardContent sx={{ py: "0 !important", minHeight: 100 }}>
              <TabPanel value={currentTab} index={0}>
                <MySlackChannels />
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                Item Two
              </TabPanel>
              {authProfileScope === AuthScope.slackAdmin && (
                <TabPanel value={currentTab} index={2}>
                  Item Three
                </TabPanel>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};
