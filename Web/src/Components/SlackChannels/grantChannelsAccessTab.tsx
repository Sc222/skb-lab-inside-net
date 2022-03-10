import React, { FunctionComponent, useEffect } from "react";
import { Box, CircularProgress, Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "src/Contexts/authContext";
import { SlackAccessesApi } from "../../Api/slackAccessesApi";
import { SlackAccessRequestModel } from "../../Api/Models/slackAccessRequestModel";
import { GrantChannelAccessListItem } from "./grantChannelAccessListItem";
import { Api } from "../../Api/api";

interface GrantChannelsAccessTabProps {}

//FIXME: DRY !!!
//FIXME: also output declined and resolved requests somewhere (think about it...)
//FIXME: split accessRequests by different types (admin_1 can resolve some types of requests but others can be resolved only by admin_2)
export const GrantChannelsAccessTab: FunctionComponent<GrantChannelsAccessTabProps> = () => {
  const auth = useAuthContext();
  const [pendingAccessRequests, setPendingAccessRequests] = React.useState<SlackAccessRequestModel[] | null>(null);

  const getAllAccessRequests = async () => {
    // todo think about access right, should they be checked here or not?
    if (auth.authInfo) {
      const response = await SlackAccessesApi.GetAllAccessRequests(auth.authInfo.token);
      if (Api.IsRequestSuccess(response) && response.data) {
        //TODO: filter using "pending status"
        setPendingAccessRequests(response.data.filter((r) => !r.disapproveReason).reverse());
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
      if (request.isDisapproved) {
        await SlackAccessesApi.UpdateAccessRequest(request, auth.authInfo.token);
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
            <div key={request.id}>
              <GrantChannelAccessListItem accessRequest={request} onChangeRequestStatus={onChangeRequestStatus} />
              {index !== pendingAccessRequests.length - 1 && <Divider variant="fullWidth" />}
            </div>
          ))}

          {/* nothing found*/}
          {pendingAccessRequests.length === 0 && (
            <Box sx={{ py: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Typography textAlign="center" variant="h6">
                Нет активных запросов
              </Typography>
              <Box sx={{ mt: 0.5, display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }} textAlign="center" variant="body2" component="span">
                  Запросов либо нет, либо они все уже обработаны
                </Typography>
              </Box>
            </Box>
          )}
        </List>
      ) : (
        <Box sx={{ m: 4, display: "flex", height: "100%", justifyContent: "center" }}>
          {/*TODO MOVE TO LOADING COMPONENT*/}
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
