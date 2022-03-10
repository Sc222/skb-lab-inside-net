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
}) => {
  const onClick = (_: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!isRequestSent) {
      // fixme debounce to prevent multiple requests
      onRequestAccess(channel.channelId);
    }
  };

  return (
    <ListItem
      sx={{ py: 2 }}
      disablePadding
      secondaryAction={
        <Button onClick={onClick} disabled={isRequestSent} variant={"contained"} component="span" size="small">
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
          text={channel.channelName}
          letterIndex={0}
        />
      </ListItemAvatar>

      {/*TODO CORRECT LINKS*/}
      <ListItemText
        primary={
          <Link
            target="_blank"
            rel="noopener"
            href={`https://companydomain.slack.com/messages/${channel.channelId}`}
            variant="inherit"
            color="inherit"
            underline="hover"
            sx={{
              cursor: "pointer",
            }}
          >
            {`#${channel.channelName}`}
          </Link>
        }
        secondary={channel.channelDescription ?? "Описание отсутствует"}
      />
    </ListItem>
  );
};
