import React, { FunctionComponent, useEffect } from "react";
import Box from "@mui/material/Box";
import { AuthScope } from "../../../Typings/Enums/authScope";
import { useAuthContext } from "../../../Contexts/authContext";
import { SlackChannelsToolbar, TabPanel } from "../../../Components/SlackChannels/slackChannelsToolbar";
import { Card, CardContent, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MyChannelsTab } from "../../../Components/SlackChannels/myChannelsTab";
import { RequestChannelAccessTab } from "../../../Components/SlackChannels/requestChannelAccessTab";
import { GrantChannelsAccessTab } from "../../../Components/SlackChannels/grantChannelsAccessTab";
import { useSearchParams } from "react-router-dom";
import { SlackChannelsSearchParam } from "../../../Typings/Enums/slackChannelsSearchParam";

interface SlackChannelsPageProps {}

//TODO: where should we show DISAPPROVED channel requests ???

export const SlackChannelsPage: FunctionComponent<SlackChannelsPageProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsTab = searchParams.get(SlackChannelsSearchParam.tab);
  const currentTab = searchParamsTab !== null && Number.isFinite(Number(searchParamsTab)) ? searchParamsTab : "0"; //todo typings
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
  }, [auth]);

  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSearchParams({ [SlackChannelsSearchParam.tab]: String(newValue) });
  };

  const generateTabProps = (value: string) => {
    return {
      id: `simple-tab-${value}`,
      "aria-controls": `simple-tabpanel-${value}`,
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
                {authProfileScope && (
                  <Tabs value={Number(currentTab)} onChange={onTabChange} aria-label="basic tabs example">
                    <Tab label="Мои каналы" {...generateTabProps("0")} />
                    <Tab label="Запросить доступ" {...generateTabProps("1")} />
                    {authProfileScope === AuthScope.slackAdmin && (
                      <Tab label="Выдача доступа" {...generateTabProps("2")} />
                    )}
                  </Tabs>
                )}
              </Box>
            </CardContent>
            <CardContent sx={{ py: "0 !important", minHeight: 100 }}>
              <>
                <TabPanel value={currentTab} name={"0"}>
                  <MyChannelsTab />
                </TabPanel>
                <TabPanel value={currentTab} name={"1"}>
                  <RequestChannelAccessTab />
                </TabPanel>
                {authProfileScope === AuthScope.slackAdmin && (
                  <TabPanel value={currentTab} name={"2"}>
                    <GrantChannelsAccessTab />
                  </TabPanel>
                )}
              </>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};
