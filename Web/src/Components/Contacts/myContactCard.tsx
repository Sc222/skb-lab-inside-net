import React, { FunctionComponent } from "react";
import { Avatar, Button, IconButton, Link, ListItem, ListItemAvatar, ListItemText, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { MyContact } from "../../Typings/Types/myContact";
import { useDesktop, useMobile, useTablet } from "../../Hooks/responsiveHooks";
import { DeleteOutlined, Person } from "@mui/icons-material";

interface MyContactCardProps {
  contact: MyContact; // todo api request should return partial PersonModel for PERFORMANCE
  onDelete: (contactId: string) => void;
}

export const MyContactCard: FunctionComponent<MyContactCardProps> = ({ contact, onDelete }) => {
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
            <IconButton size="large" color={"primary"} onClick={() => onDelete(contact.id!)}>
              <DeleteOutlined fontSize="inherit" />
            </IconButton>
          )}
          {(isTablet || isDesktop) && (
            <Button onClick={() => onDelete(contact.id!)} variant="text" component="span" size="small">
              Удалить
            </Button>
          )}
        </>
      }
    >
      <ListItemAvatar>
        <Avatar
          sx={(theme) => ({
            mr: 2,
            height: 60,
            width: 60,
            fontSize: "48px",
            border: `solid 1px ${theme.palette.primary.main}`,
            background: theme.palette.background.paper,
          })}
          src={contact.avatarUrl}
        >
          <Person color="primary" fontSize="inherit" />
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
            <Link
              target="_blank"
              rel="noopener"
              href={`mailto:${contact.email}`}
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
              href={`tel:${contact.phoneNumber}`}
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
};
