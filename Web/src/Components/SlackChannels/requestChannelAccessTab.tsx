import React, { FunctionComponent, useEffect } from "react";
import { Box, Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "src/Contexts/authContext";
import { SlackChannelModel } from "../../Api/Models/slackChannelModel";
import { RequestChannelListItem } from "./requestChannelListItem";

//--------------------------------------------------------------
//TODO: START FROM HERE -> AccessRequestAPI + 2 ui tabs for this
// THEN:
// 1) CALENDAR
// 2) ТАБЕЛЬ
//--------------------------------------------------------------

interface RequestChannelAccessTabProps {}

//TODO think about possibility to search NOT ONLY CONTACTS

//FIXME: DRY !!!
export const RequestChannelAccessTab: FunctionComponent<RequestChannelAccessTabProps> = () => {
  const auth = useAuthContext();
  const [personChannels, setPersonChannels] = React.useState<SlackChannelModel[] | null>(null);

  useEffect(() => {
    const getSlackChannels = async () => {
      await auth.getPersonSlackChannelsInfo((result) => {
        if (result.success) {
          setPersonChannels(result.success.filter((c) => !c.IsInChannel));
        } else {
          // todo process errors somehow
          setPersonChannels(null);
        }
      });
    };
    getSlackChannels();
  }, [auth]);

  const onRequestChannelAccess = (channelId: string) => {
    //TODO Send request here
  };

  return (
    <>
      {personChannels ? (
        <List>
          {personChannels.map((channel, index) => (
            <div key={channel.ChannelId}>
              <RequestChannelListItem
                channel={channel}
                isRequestSent={false}
                onRequestAccess={onRequestChannelAccess}
              />
              {index !== personChannels.length - 1 && <Divider variant="middle" />}
            </div>
          ))}

          {/* nothing found*/}
          {personChannels.length === 0 && (
            <Box sx={{ py: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Typography textAlign="center" variant="h6">
                У вас есть доступ ко всем каналам
              </Typography>
              <Box sx={{ mt: 0.5, display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }} textAlign="center" variant="body2" component="span">
                  Вы можете посмотреть ваши каналы в соседней вкладке
                </Typography>
              </Box>
            </Box>
          )}
        </List>
      ) : (
        <Typography>{/*TODO LOADING INDICATOR*/}</Typography>
      )}
    </>
  );
};
