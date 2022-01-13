import React, { FunctionComponent, useEffect } from "react";
import { Box, Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "src/Contexts/authContext";
import { SlackChannelModel } from "../../Api/Models/slackChannelModel";
import { MyChannelListItem } from "./myChannelListItem";

interface MyChannelsTabProps {}

//TODO think about possibility to search NOT ONLY CONTACTS

//FIXME: DRY !!!
export const MyChannelsTab: FunctionComponent<MyChannelsTabProps> = () => {
  const auth = useAuthContext();
  const [personChannels, setPersonChannels] = React.useState<SlackChannelModel[] | null>(null);

  useEffect(() => {
    const getSlackChannels = async () => {
      await auth.getPersonSlackChannelsInfo((result) => {
        if (result.success) {
          setPersonChannels(result.success.filter((c) => c.IsInChannel));
        } else {
          // todo process errors somehow
          setPersonChannels(null);
        }
      });
    };
    getSlackChannels();
  }, [auth]);

  return (
    <>
      {personChannels ? (
        <List>
          {personChannels.map((channel, index) => (
            <div key={channel.ChannelId}>
              <MyChannelListItem channel={channel} />
              {index !== personChannels.length - 1 && <Divider variant="middle" />}
            </div>
          ))}

          {/* nothing found*/}
          {personChannels.length === 0 && (
            <Box sx={{ py: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Typography textAlign="center" variant="h6">
                Нет доступных каналов
              </Typography>
              <Box sx={{ mt: 0.5, display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }} textAlign="center" variant="body2" component="span">
                  Вы можете запросить доступы к каналам в соседней вкладке
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
