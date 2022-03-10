import React, { FunctionComponent } from "react";
import { Avatar, Button, IconButton, Link, ListItem, ListItemAvatar, ListItemText, useTheme } from "@mui/material";
import { SearchContact } from "../../Typings/Types/searchContact";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { useDesktop, useMobile, useTablet } from "../../Hooks/responsiveHooks";
import { AddOutlined, DeleteOutlined } from "@mui/icons-material";

interface SearchContactCardProps {
  contact: SearchContact; // todo api request should return partial PersonModel for PERFORMANCE
  isInContacts: boolean;
  onIsInContactsChange: (contactId: string, value: boolean) => void;
}

export const SearchContactCard: FunctionComponent<SearchContactCardProps> = ({
  contact,
  isInContacts,
  onIsInContactsChange,
}) => {
  const theme = useTheme();
  const isMobile = useMobile(theme);
  const isTablet = useTablet(theme);
  const isDesktop = useDesktop(theme);

  return (
    <ListItem
      sx={{ py: 2 }}
      disablePadding
      secondaryAction={
        <>
          {isMobile && (
            <IconButton
              size="medium"
              color={isInContacts ? "default" : "primary"}
              onClick={() => onIsInContactsChange(contact.id!, !isInContacts)}
            >
              {isInContacts ? <DeleteOutlined /> : <AddOutlined />}
            </IconButton>
          )}
          {(isTablet || isDesktop) && (
            <Button
              onClick={() => onIsInContactsChange(contact.id!, !isInContacts)}
              variant={isInContacts ? "outlined" : "contained"}
              component="span"
              size="small"
            >
              {isInContacts ? "Удалить" : "Добавить"}
            </Button>
          )}
        </>
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
          src={contact.avatarUrl}
        >
          <AccountCircleOutlinedIcon color="primary" fontSize="inherit" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link
            component={RouterLink}
            to={`${SiteRoute.persons}/${contact.id}/${SiteRoute.profile}`}
            variant="inherit"
            color="inherit"
            underline="hover"
            sx={{
              cursor: "pointer",
            }}
          >
            {contact.fullName}
          </Link>
        }
        secondary={
          <>
            {contact.position.name}
            <br />
            {contact.department.name}
          </>
        }
      />
    </ListItem>
  );
};
