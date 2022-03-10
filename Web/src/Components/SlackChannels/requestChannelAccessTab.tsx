import React, { FunctionComponent, useEffect } from "react";
import { Box, Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "src/Contexts/authContext";
import { SlackChannelModel } from "../../Api/Models/slackChannelModel";
import { RequestChannelListItem } from "./requestChannelListItem";
import { SlackAccessesApi } from "../../Api/slackAccessesApi";
import { SlackAccessRequestModel } from "../../Api/Models/slackAccessRequestModel";
import { PersonModel } from "../../Api/Models/personModel";

interface RequestChannelAccessTabProps {}

//FIXME: DRY !!!
export const RequestChannelAccessTab: FunctionComponent<RequestChannelAccessTabProps> = () => {
  const auth = useAuthContext();
  const [personChannels, setPersonChannels] = React.useState<SlackChannelModel[] | null>(null);
  const [personRequests, setPersonRequests] = React.useState<SlackAccessRequestModel[] | null>(null);
  const [personInfo, setPersonInfo] = React.useState<PersonModel | null>(null);

  const getAccessRequests = async () => {
    await auth.getPersonSlackAccessRequestsChannels((result) => {
      if (result.success) {
        setPersonRequests(result.success);
      } else {
        // todo process errors somehow
        setPersonRequests([]);
      }
    });
  };

  useEffect(() => {
    const getSlackChannels = async () => {
      await auth.getPersonSlackChannelsInfo((result) => {
        if (result.success) {
          setPersonChannels(result.success.filter((c) => !c.isInChannel));
        } else {
          // todo process errors somehow
          setPersonChannels(null);
        }
      });
    };
    const getPersonInfo = async () => {
      await auth.getPersonInfo((result) => {
        if (result.success) {
          setPersonInfo(result.success);
        } else {
          // todo process errors somehow
          setPersonInfo(null);
        }
      });
    };
    getSlackChannels();
    getAccessRequests();
    getPersonInfo();
  }, [auth]);

  const onRequestChannelAccess = async (channel: SlackChannelModel) => {
    //FIXME make SlackId REQUIRED FIELD IN PERSON MODEL
    console.log(personInfo);
    if (auth.authInfo && personInfo && personInfo.slackId) {
      let request: Omit<SlackAccessRequestModel, "id"> = {
        channelId: channel.channelId,
        channelName: channel.channelName,
        disapproveReason: "",
        //Status: "pending",
        isDisapproved: false,
        person: personInfo,
      };
      await SlackAccessesApi.CreateAccessRequest(request, auth.authInfo.token);

      //FIXME: reloading data, is it ok?
      getAccessRequests();
    }
  };

  return (
    <>
      {personChannels && personRequests !== null ? (
        <List>
          {personChannels.map((channel, index) => (
            <div key={channel.channelId}>
              {/*fixme optimize findIndex*/}
              <RequestChannelListItem
                channel={channel}
                isRequestSent={personRequests?.findIndex((r) => r.channelId === channel.channelId) !== -1}
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
