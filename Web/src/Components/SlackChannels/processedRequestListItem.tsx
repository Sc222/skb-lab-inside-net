import React, { FunctionComponent } from "react";
import { Avatar, Button, Chip, Grid, Link, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { Person } from "@mui/icons-material";
import { SlackAccessRequestModel } from "../../Api/Models/slackAccessRequestModel";

interface ProcessedRequestListItemProps {
  accessRequest: SlackAccessRequestModel;
}

export const ProcessedRequestListItem: FunctionComponent<ProcessedRequestListItemProps> = ({ accessRequest }) => {
  return (
    <>
      {/*TODO CORRECT LINKS*/}
      <ListItem
        sx={{ pt: 2, pb: 1 }}
        disablePadding
        secondaryAction={
          <Chip
            target="_blank"
            rel="noopener"
            clickable
            component="a"
            color={accessRequest.isDisapproved ? "error" : "primary"}
            variant="outlined"
            size="medium"
            label={accessRequest.channelName}
            href={`https://companydomain.slack.com/messages/${accessRequest.channelId}`}
          />
        }
      >
        <ListItemAvatar>
          {/*TODO: AVATARS FIX DRY*/}
          <Avatar
            src={accessRequest.person.avatarUrl}
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
        <ListItemText
          primary={
            <Link
              component={RouterLink}
              to={`${SiteRoute.persons}/${accessRequest.person.id!}/${SiteRoute.profile}`}
              variant="inherit"
              color="inherit"
              underline="hover"
              sx={{
                cursor: "pointer",
              }}
            >
              {accessRequest.person.fullName}
            </Link>
          }
          secondary={accessRequest.person.position}
        />
      </ListItem>
      <Grid
        sx={{ pt: 0, pb: 2.5 }}
        alignContent="center"
        alignItems="center"
        justifyContent="space-between"
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Chip
            color={accessRequest.isDisapproved ? "error" : "primary"}
            variant="outlined"
            size="medium"
            label={accessRequest.isDisapproved ? "Отклонено" : "Одобрено"}
          />
          {accessRequest.disapproveReason.length > 0 && (
            <>
              <Typography sx={{ mt: 1 }} variant="h6">
                Сообщение
              </Typography>
              <Typography variant="body2">{accessRequest.disapproveReason}</Typography>
            </>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button size="small" color="primary" variant="outlined">
            Редактировать
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
