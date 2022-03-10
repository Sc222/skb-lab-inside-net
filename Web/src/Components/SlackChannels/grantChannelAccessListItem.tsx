import React, { FunctionComponent } from "react";
import { Avatar, Button, Chip, Grid, Link, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { SlackAccessRequestModelExtended } from "../../Api/Models/slackAccessRequestModelExtended";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { SlackAccessRequestModel } from "../../Api/Models/slackAccessRequestModel";
import { Person } from "@mui/icons-material";

interface GrantChannelAccessListItemProps {
  accessRequest: SlackAccessRequestModelExtended;
  onChangeRequestStatus: (accessRequest: SlackAccessRequestModel) => void;
}

export const GrantChannelAccessListItem: FunctionComponent<GrantChannelAccessListItemProps> = ({
  accessRequest,
  onChangeRequestStatus,
}) => {
  const [message, setMessage] = React.useState("");

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onReject = (_: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    onChangeRequestStatus({
      Id: accessRequest.Id,
      PersonId: accessRequest.PersonId,
      ChannelId: accessRequest.ChannelId,
      Status: "disapproved",
      AdminMessage: message,
    });
  };

  const onApprove = (_: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    onChangeRequestStatus({
      Id: accessRequest.Id,
      PersonId: accessRequest.PersonId,
      ChannelId: accessRequest.ChannelId,
      Status: "approved",
      AdminMessage: message,
    });
  };

  return (
    <>
      <ListItem
        sx={{ pt: 2, pb: 1 }}
        disablePadding
        secondaryAction={
          <Chip
            target="_blank"
            rel="noopener"
            clickable
            component="a"
            color="primary"
            variant="outlined"
            size="medium"
            label={accessRequest.ChannelName}
            href={`https://companydomain.slack.com/messages/${accessRequest.ChannelId}`}
          />
        }
      >
        <ListItemAvatar>
          <Avatar
            src={accessRequest.PersonAvatar}
            sx={(theme) => ({
              height: 48,
              width: 48,
              fontSize: "32px",
              mr: 2,
              border: `solid 1px ${theme.palette.primary.main}`,
              background: theme.palette.background.paper,
            })}
          >
            <Person color="primary" fontSize="inherit" />
          </Avatar>
        </ListItemAvatar>

        {/*TODO CORRECT LINKS*/}
        <ListItemText
          primary={
            <Link
              component={RouterLink}
              to={`${SiteRoute.persons}/${accessRequest.PersonId}/${SiteRoute.profile}`}
              variant="inherit"
              color="inherit"
              underline="hover"
              sx={{
                cursor: "pointer",
              }}
            >
              {accessRequest.PersonName}
            </Link>
          }
          secondary={accessRequest.PersonPosition}
        />
      </ListItem>

      <Grid
        sx={{ pt: 1.5, pb: 2.5 }}
        alignContent="center"
        alignItems="center"
        justifyContent="space-between"
        container
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <TextField
            onInput={onMessageChange}
            value={message}
            fullWidth
            id={`message-field-${accessRequest.Id}`}
            label="Сообщение"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "inline-flex" }}>
          <Button sx={{ mr: 1 }} onClick={onReject} size="small" color="error" variant="outlined">
            Отклонить
          </Button>
          <Button onClick={onApprove} size="small" color="primary" variant="outlined">
            Одобрить
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
