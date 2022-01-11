import React, { FunctionComponent } from "react";
import { Avatar, Button, Link, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { SearchContact } from "../../Typings/Types/searchContact";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";

interface SearchContactCardProps {
  contact: SearchContact; // todo api request should return partial PersonModel for PERFORMANCE
}

export const SearchContactCard: FunctionComponent<SearchContactCardProps> = ({ contact }) => (
  <ListItem
    sx={{ py: 2 }}
    disablePadding
    secondaryAction={
      <Button variant="outlined" component="span" size="small">
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
        }}
        src={contact.AvatarUrl}
      >
        <AccountCircleOutlinedIcon fontSize="small" />
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
          {contact.Department.Name}
          <br />
          {contact.Position.Name}
        </>
      }
    />
  </ListItem>
);
