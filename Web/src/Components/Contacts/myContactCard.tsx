import React, { FunctionComponent } from "react";
import { Avatar, Button, Link, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { SearchContact } from "../../Typings/Types/searchContact";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { MyContact } from "../../Typings/Types/myContact";

interface MyContactCardProps {
  contact: MyContact; // todo api request should return partial PersonModel for PERFORMANCE
  onDelete: (contactId: string) => void;
}

export const MyContactCard: FunctionComponent<MyContactCardProps> = ({ contact, onDelete }) => (
  <ListItem
    sx={{ py: 2 }}
    disablePadding
    secondaryAction={
      <Button onClick={() => onDelete(contact.Id!)} variant="text" component="span" size="small">
        Удалить
      </Button>
    }
  >
    <ListItemAvatar>
      <Avatar
        sx={{
          mr: 2,
          height: 60,
          width: 60,
          fontSize: "48px",
        }}
        src={contact.AvatarUrl}
      >
        <AccountCircleOutlinedIcon color="primary" fontSize="inherit" />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={
        <Link
          component={RouterLink}
          to={`${SiteRoute.persons}/${contact.Id}/${SiteRoute.profile}`}
          variant="inherit"
          color="inherit"
          underline="hover"
          sx={{
            cursor: "pointer",
          }}
        >
          {contact.FullName}
        </Link>
      }
      secondary={
        <>
          {contact.Position.Name}
          <br />
          <Link
            target="_blank"
            rel="noopener"
            href={`mailto:${contact.Email}`}
            color="secondary"
            variant="subtitle2"
            underline="hover"
            sx={{
              cursor: "pointer",
              mr: 1,
            }}
          >
            Почта
          </Link>
          <Link
            target="_blank"
            rel="noopener"
            href={`tel:${contact.PhoneNumber}`}
            color="secondary"
            variant="subtitle2"
            underline="hover"
            sx={{
              cursor: "pointer",
            }}
          >
            Телефон
          </Link>
        </>
      }
    />
  </ListItem>
);
