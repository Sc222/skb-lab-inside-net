import React, { FunctionComponent } from "react";
import { Avatar, Button, Chip, Grid, Link, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { SlackAccessRequestModelExtended } from "../../Api/Models/slackAccessRequestModelExtended";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";

interface ProcessedRequestListItemProps {
  accessRequest: SlackAccessRequestModelExtended;
}

export const ProcessedRequestListItem: FunctionComponent<ProcessedRequestListItemProps> = ({ accessRequest }) => {
  return (
    <>
      {" "}
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
            color={accessRequest.Status === "approved" ? "primary" : "error"}
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
            sx={{
              height: 48,
              width: 48,
              fontSize: "32px",
              mr: 2,
            }}
          >
            <AccountCircleOutlinedIcon color="primary" fontSize="inherit" />
          </Avatar>
        </ListItemAvatar>
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
        sx={{ pt: 0, pb: 2.5 }}
        alignContent="center"
        alignItems="center"
        justifyContent="space-between"
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Chip
            color={accessRequest.Status === "approved" ? "primary" : "error"}
            variant="outlined"
            size="medium"
            label={accessRequest.Status === "approved" ? "Одобрено" : "Отклонено"}
          />
          {accessRequest.AdminMessage.length > 0 && (
            <>
              <Typography sx={{ mt: 1 }} variant="h6">
                Сообщение
              </Typography>
              <Typography variant="body2">{accessRequest.AdminMessage}</Typography>{" "}
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
