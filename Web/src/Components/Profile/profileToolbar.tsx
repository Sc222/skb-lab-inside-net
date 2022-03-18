import {
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { PersonModel } from "../../Api/Models/personModel";
import { useDesktop, useMobile, useTablet } from "../../Hooks/responsiveHooks";
import { AddOutlined, DeleteOutlined, Person } from "@mui/icons-material";

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
  const theme = useTheme();
  const isMobile = useMobile(theme);
  const isTablet = useTablet(theme);
  const isDesktop = useDesktop(theme);

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
                          {/** TODO: finish settings page */}
                          {/*{authPersonId && !isMobile && (
                            <Link
                              component={RouterLink}
                              to={`${SiteRoute.persons}/${authPersonId}/${SiteRoute.settings}`}
                            >
                              {isTablet && (
                                <IconButton size="large" color="primary">
                                  <EditOutlined fontSize="inherit" />
                                </IconButton>
                              )}
                              {isDesktop && (
                                <Button variant="outlined" component="span" size="medium">
                                  Редактировать
                                </Button>
                              )}
                            </Link>
                          )}*/}
                        </>
                      ) : (
                        <>
                          {isMobile && (
                            <IconButton
                              size="large"
                              color={isPersonInContacts ? "default" : "primary"}
                              onClick={() => onIsInContactsChange(!isPersonInContacts)}
                            >
                              {isPersonInContacts ? <DeleteOutlined fontSize="inherit" /> : <AddOutlined />}
                            </IconButton>
                          )}
                          {(isTablet || isDesktop) && (
                            <Button
                              onClick={() => onIsInContactsChange(!isPersonInContacts)}
                              variant={isPersonInContacts ? "outlined" : "contained"}
                              component="span"
                              size="medium"
                            >
                              {isPersonInContacts ? "Удалить" : "Добавить"}
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={(theme) => ({
                    [theme.breakpoints.down("md")]: {
                      height: 72,
                      width: 72,
                      fontSize: "54px",
                      mr: 2,
                    },
                    [theme.breakpoints.up("md")]: {
                      height: 128,
                      width: 128,
                      fontSize: "96px",
                      mr: 4,
                    },

                    border: `solid 2px ${theme.palette.primary.main}`,
                    background: theme.palette.background.paper,
                  })}
                  src={person?.avatarUrl}
                >
                  <Person color="primary" fontSize="inherit" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant={isMobile || isTablet ? "h5" : "h4"}>{person.fullName}</Typography>}
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
