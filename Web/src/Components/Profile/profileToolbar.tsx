import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { PersonModel } from "../../Api/Models/personModel";

interface ProfileToolbarProps {
  person: PersonModel | null;
  isLoading: boolean;
  isAuthPersonProfilePage: boolean | null;
  authPersonId: string | null;
  isPersonInContacts: boolean | null;
  onIsInContactsChange: (value: boolean) => void;
}

// FIXME make more responsive on mobile
export const ProfileToolbar: FunctionComponent<ProfileToolbarProps> = ({
  person,
  isLoading,
  authPersonId,
  isAuthPersonProfilePage,
  isPersonInContacts,
  onIsInContactsChange,
}) => {
  return (
    <>
      {!isLoading && person && (
        <Card>
          <CardContent sx={{ py: "0 !important" }}>
            <ListItem
              sx={{ py: 2 }}
              disablePadding
              secondaryAction={
                <>
                  {isAuthPersonProfilePage !== null && isPersonInContacts !== null && (
                    <>
                      {isAuthPersonProfilePage ? (
                        <>
                          {authPersonId && (
                            <Link
                              component={RouterLink}
                              to={`${SiteRoute.persons}/${authPersonId}/${SiteRoute.settings}`}
                            >
                              <Button variant="outlined" component="span" size="medium">
                                Редактировать
                              </Button>
                            </Link>
                          )}
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => onIsInContactsChange(!isPersonInContacts)}
                            variant={isPersonInContacts ? "outlined" : "contained"}
                            component="span"
                            size="medium"
                          >
                            {isPersonInContacts ? "Удалить" : "Добавить"}
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    mr: 4,
                    height: 128,
                    width: 128,
                    fontSize: "96px",
                  }}
                  src={person?.avatarUrl}
                >
                  <AccountCircleOutlinedIcon color="primary" fontSize="inherit" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h4">{person.fullName}</Typography>}
                secondary={
                  <>
                    <Typography variant="h6">{person.position.name}</Typography>
                    <Typography variant="body1">
                      {person.department.name}
                      <br />
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </CardContent>
        </Card>
      )}
    </>
  );
};
