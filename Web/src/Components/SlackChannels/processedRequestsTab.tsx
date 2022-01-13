import React, { FunctionComponent, useEffect } from "react";
import { Box, Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "src/Contexts/authContext";
import { SlackAccessesApi } from "../../Api/slackAccessesApi";
import { SlackAccessRequestModelExtended } from "../../Api/Models/slackAccessRequestModelExtended";
import { Api } from "../../Api/api";
import { ProcessedRequestListItem } from "./processedRequestListItem";

interface ProcessedRequestsTabProps {}

//FIXME: DRY !!!
//FIXME: also output declined and resolved requests somewhere (think about it...)
//FIXME: split accessRequests by different types (admin_1 can resolve some types of requests but others can be resolved only by admin_2)
export const ProcessedRequestsTab: FunctionComponent<ProcessedRequestsTabProps> = () => {
  const auth = useAuthContext();
  const [processedAccessRequests, setProcessedAccessRequests] = React.useState<
    SlackAccessRequestModelExtended[] | null
  >(null);

  const getAccessRequests = async () => {
    // todo think about access right, should they be checked here or not?
    if (auth.authInfo) {
      const response = await SlackAccessesApi.GetAllAccessRequests(auth.authInfo.token);
      if (Api.IsRequestSuccess(response) && response.data) {
        setProcessedAccessRequests(response.data.filter((r) => r.Status !== "pending").reverse());
      } else {
        //todo process error
        setProcessedAccessRequests(null);
      }
    }
  };

  useEffect(() => {
    getAccessRequests();
  }, [auth]);

  return (
    <>
      {processedAccessRequests ? (
        <List>
          {processedAccessRequests.map((request, index) => (
            <div key={request.Id}>
              <ProcessedRequestListItem accessRequest={request} />
              {index !== processedAccessRequests.length - 1 && <Divider variant="fullWidth" />}
            </div>
          ))}

          {/* nothing found*/}
          {processedAccessRequests.length === 0 && (
            <Box sx={{ py: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
              <Typography textAlign="center" variant="h6">
                Нет обработанных запросов
              </Typography>
              <Box sx={{ mt: 0.5, display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }} textAlign="center" variant="body2" component="span">
                  Запросов на доступ либо нет, либо ни один из них еще не обработан
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
