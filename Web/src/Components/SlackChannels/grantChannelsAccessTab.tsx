import React, { FunctionComponent, useEffect } from "react";
import { Box, Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "src/Contexts/authContext";
import { SlackAccessesApi } from "../../Api/slackAccessesApi";
import { SlackAccessRequestModel } from "../../Api/Models/slackAccessRequestModel";
import { SlackAccessRequestModelExtended } from "../../Api/Models/slackAccessRequestModelExtended";
import { GrantChannelAccessListItem } from "./grantChannelAccessListItem";
import { Api } from "../../Api/api";

interface GrantChannelsAccessTabProps {}

//FIXME: DRY !!!
//FIXME: also output declined and resolved requests somewhere (think about it...)
//FIXME: split accessRequests by different types (admin_1 can resolve some types of requests but others can be resolved only by admin_2)
export const GrantChannelsAccessTab: FunctionComponent<GrantChannelsAccessTabProps> = () => {
  const auth = useAuthContext();
  const [pendingAccessRequests, setPendingAccessRequests] = React.useState<SlackAccessRequestModelExtended[] | null>(
    null
  );

  const getAllAccessRequests = async () => {
    // todo think about access right, should they be checked here or not?
    if (auth.authInfo) {
      const response = await SlackAccessesApi.GetAllAccessRequests(auth.authInfo.token);
      if (Api.IsRequestSuccess(response) && response.data) {
        setPendingAccessRequests(response.data.filter((r) => r.Status === "pending"));
      } else {
        //todo process error
        setPendingAccessRequests(null);
      }
    }
  };

  useEffect(() => {
    getAllAccessRequests();
  }, [auth]);

  const onChangeRequestStatus = async (request: SlackAccessRequestModel) => {
    if (auth.authInfo) {
      if (request.Status) {
        await SlackAccessesApi.DisapproveAccessRequest(request, auth.authInfo.token);
      } else {
        await SlackAccessesApi.ApproveAccessRequest(request, auth.authInfo.token);
      }
      //FIXME: reloading data, is it ok?
      getAllAccessRequests();
    }
  };

  return (
    <>
      {pendingAccessRequests ? (
        <List>
          {pendingAccessRequests.map((request, index) => (
            <div key={request.Id}>
              <GrantChannelAccessListItem accessRequest={request} onChangeRequestStatus={onChangeRequestStatus} />
              {index !== pendingAccessRequests.length - 1 && <Divider variant="fullWidth" />}
            </div>
          ))}

          {/* nothing found*/}
          {pendingAccessRequests.length === 0 && (
            <Box sx={{ py: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Typography textAlign="center" variant="h6">
                Нет новых запросов
              </Typography>
              <Box sx={{ mt: 0.5, display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }} textAlign="center" variant="body2" component="span">
                  На данный момент обработаны все запросы на доступ к Slack каналам
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
