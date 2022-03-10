import React, { FunctionComponent } from "react";
import { Button, Link, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { SlackChannelModel } from "../../Api/Models/slackChannelModel";
import { TextAvatar } from "../Common/textAvatar";

export enum RequestStatus {
  none,
  pending,
  disapproved,
}

interface RequestChannelListItemProps {
  channel: SlackChannelModel;
  status: RequestStatus;
  onRequestAccess: (channel: SlackChannelModel) => void;
}

export const RequestChannelListItem: FunctionComponent<RequestChannelListItemProps> = ({
  channel,
  status,
  onRequestAccess,
}) => {
  const onClick = (_: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (status !== RequestStatus.pending) {
      // fixme debounce to prevent multiple requests
      onRequestAccess(channel);
    }
  };

  //fixme move to method
  let message = "Запросить";
  switch (status) {
    case RequestStatus.disapproved:
      message = "Запросить повторно";
      break;
    case RequestStatus.none:
      break;
    case RequestStatus.pending:
      message = "Запрос обрабатывается";
      break;
  }

  return (
    <ListItem
      sx={{ py: 2 }}
      disablePadding
      secondaryAction={
        <Button
          onClick={onClick}
          disabled={status === RequestStatus.pending}
          variant={"contained"}
          component="span"
          size="small"
          color={status === RequestStatus.disapproved ? "error" : "primary"}
        >
          {message}
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
