import React, { FunctionComponent } from "react";
import { Button, Link, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { SlackChannelModel } from "../../Api/Models/slackChannelModel";
import { TextAvatar } from "../Common/textAvatar";

interface RequestChannelListItemProps {
  channel: SlackChannelModel;
  isRequestSent: boolean;
  onRequestAccess: (channelId: string) => void;
}

export const RequestChannelListItem: FunctionComponent<RequestChannelListItemProps> = ({
  channel,
  isRequestSent,
  onRequestAccess,
}) => (
  <ListItem
    sx={{ py: 2 }}
    disablePadding
    secondaryAction={
      <Button
        onClick={isRequestSent ? () => onRequestAccess(channel.ChannelId) : undefined}
        disabled={isRequestSent}
        variant={"contained"}
        component="span"
        size="small"
      >
        {isRequestSent ? "Запрос обрабатывается" : "Запросить"}
      </Button>
    }
  >
    <ListItemAvatar>
      <TextAvatar
        sx={{
          mr: 2,
          height: 48,
          width: 48,
          fontSize: "32px",
        }}
        text={channel.ChannelName}
        letterIndex={1}
      />
    </ListItemAvatar>

    {/*TODO CORRECT LINKS*/}
    <ListItemText
      primary={
        <Link
          target="_blank"
          rel="noopener"
          href={`https://companydomain.slack.com/messages/${channel.ChannelId}`}
          variant="inherit"
          color="inherit"
          underline="hover"
          sx={{
            cursor: "pointer",
          }}
        >
          {channel.ChannelName}
        </Link>
      }
      secondary={channel.ChannelDescription}
    />
  </ListItem>
);
