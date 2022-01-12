import React, { FunctionComponent } from "react";
import { Avatar, Button, Link, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { SearchContact } from "../../Typings/Types/searchContact";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";

interface SearchContactCardProps {
  contact: SearchContact; // todo api request should return partial PersonModel for PERFORMANCE
  isInContacts: boolean;
  onIsInContactsChange: (contactId: string, value: boolean) => void;
}

export const SearchContactCard: FunctionComponent<SearchContactCardProps> = ({
  contact,
  isInContacts,
  onIsInContactsChange,
}) => (
  <ListItem
    sx={{ py: 2 }}
    disablePadding
    secondaryAction={
      <Button
        onClick={() => onIsInContactsChange(contact.Id!, !isInContacts)}
        variant={isInContacts ? "outlined" : "contained"}
        component="span"
        size="small"
      >
        {isInContacts ? "Удалить" : "Добавить"}
      </Button>
    }
  >
    <ListItemAvatar>
      <Avatar
        sx={{
          mr: 2,
          height: 60,
          width: 60,
          bgcolor: "secondary.light",
          fontSize: "48px",
        }}
        src={contact.AvatarUrl}
      >
        <AccountCircleOutlinedIcon fontSize="inherit" />
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
          {contact.Department.Name}
        </>
      }
    />
  </ListItem>
);
