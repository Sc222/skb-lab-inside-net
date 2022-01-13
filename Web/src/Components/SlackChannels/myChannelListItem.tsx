import React, { FunctionComponent } from "react";
import { Link, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { SlackChannelModel } from "../../Api/Models/slackChannelModel";
import { TextAvatar } from "../Common/textAvatar";

interface MyChannelListItemProps {
  channel: SlackChannelModel;
  dense?: boolean;
}

export const MyChannelListItem: FunctionComponent<MyChannelListItemProps> = ({ channel, dense = false }) => (
  <ListItem sx={{ py: dense ? 0.75 : 2 }} disablePadding>
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
