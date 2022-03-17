import React, { FunctionComponent, useEffect } from "react";
import { PersonalCalendar } from "src/Components/Calendar/PersonalCalendar/personalCalendar";
import { usePersonContext } from "../../../Contexts/personContext";
import { useSearchParams } from "react-router-dom";
import { SlackChannelsSearchParam } from "../../../Typings/Enums/slackChannelsSearchParam";
import { AuthScope } from "../../../Typings/Enums/authScope";
import { useAuthContext } from "../../../Contexts/authContext";
import Box from "@mui/material/Box";
import { Card, CardContent, Container, Divider } from "@mui/material";
import { TabPanel } from "../../../Components/SlackChannels/slackChannelsToolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CalendarPageToolbar } from "../../../Components/Calendar/calendarPageToolbar";
import { PersonModel } from "../../../Api/Models/personModel";
import { PersonsApi } from "../../../Api/personsApi";
import { Api } from "../../../Api/api";
import { DepartmentCalendar } from "src/Components/Calendar/DepartmentCalendar/departmentCalendar";
import { ContactsSearchParam } from "../../../Typings/Enums/contactsSearchParam";

interface CalendarPageProps {}

export const CalendarPage: FunctionComponent<CalendarPageProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsTab = searchParams.get(SlackChannelsSearchParam.tab);
  const currentTab = searchParamsTab !== null && Number.isFinite(Number(searchParamsTab)) ? searchParamsTab : "0"; //todo typings
  const [authProfileScope, setAuthProfileScope] = React.useState<AuthScope | null>(null);
  const [authPersonInfo, setAuthPersonInfo] = React.useState<PersonModel | null>(null);
  const [departmentPersons, setDepartmentPersons] = React.useState<PersonModel[] | null>(null);

  const auth = useAuthContext();
  const person = usePersonContext();

  // must be memoized callback
  //todo FIX REACT LEAK
  //todo use useCallback + useEffect
  useEffect(() => {
    const getAuthScope = async () => {
      await auth.getAuthScope((result) => {
        if (result.success) {
          setAuthProfileScope(result.success);
        } else {
          setAuthProfileScope(AuthScope.unknown);
        }
      });
    };

    const getAuthPersonInfo = async () => {
      await auth.getPersonInfo((result) => {
        if (result.success) {
          setAuthPersonInfo(result.success);
        } else {
          setAuthPersonInfo(null);
        }
      });
    };
    getAuthScope();
    getAuthPersonInfo();
  }, [auth]);

  //get department persons if person is manager and person info was loaded
  useEffect(() => {
    const getDepartmentPersons = async () => {
      console.log("get persons: ", authPersonInfo);
      if (!auth.authInfo?.token || !authPersonInfo) {
        return;
      }

      const searchParams = new URLSearchParams();
      searchParams.set(ContactsSearchParam.departments, authPersonInfo.department.name);

      let response = await PersonsApi.Find(searchParams, auth.authInfo.token);
      let persons = !Api.IsRequestSuccess(response) || !response.data ? null : response.data;

      // Exclude yourself from the list
      setDepartmentPersons(persons ? persons.filter((p) => p.id !== authPersonInfo.id) : []);
    };
    getDepartmentPersons();
  }, [auth.authInfo?.token, authPersonInfo]);

  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSearchParams({ [SlackChannelsSearchParam.tab]: String(newValue) });
  };

  const generateTabProps = (value: string) => {
    return {
      id: `simple-tab-${value}`,
      "aria-controls": `simple-tabpanel-${value}`,
    };
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <CalendarPageToolbar />

        <Box sx={{ width: "100%", mt: 3 }}>
          <Card>
            <CardContent sx={{ px: 1, py: "0 !important" }}>
              <Box sx={{ py: 1 }}>
                {authProfileScope && (
                  <Tabs value={Number(currentTab)} onChange={onTabChange} aria-label="basic tabs example">
                    <Tab label="Мой календарь" {...generateTabProps("0")} />
                    {/*fixme refactor navigation*/}
                    {authProfileScope === AuthScope.departmentManager && (
                      <Divider orientation="vertical" flexItem variant="middle" />
                    )}
                    {authProfileScope === AuthScope.departmentManager && (
                      <Tab label="Календарь сотрудников" {...generateTabProps("2")} />
                    )}
                  </Tabs>
                )}
              </Box>
            </CardContent>
            <CardContent sx={{ py: "0 !important", minHeight: 100 }}>
              <>
                <TabPanel value={currentTab} name={"0"}>
                  <Box sx={{ py: 2 }}>
                    {/* fixme fix person in calendarData being null sometimes */}
                    {auth.authInfo && person.person && (
                      <PersonalCalendar token={auth.authInfo.token} person={person.person} />
                    )}
                  </Box>
                </TabPanel>
                {/*fixme 2 is divider, so it's skipped... damn*/}
                {authProfileScope === AuthScope.departmentManager &&
                  auth.authInfo &&
                  person.person &&
                  authPersonInfo &&
                  departmentPersons && (
                    <TabPanel value={currentTab} name={"2"}>
                      <DepartmentCalendar
                        token={auth.authInfo.token}
                        departmentManager={authPersonInfo}
                        departmentPersons={departmentPersons}
                      />
                    </TabPanel>
                  )}
              </>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );

  /* return (
    <>
      {!person.isLoading && person && (
        <div>
          CALENDAR PAGE
          <PersonalCalendar
            initialData={CalendarSource.UsersCalendarData.filter((v) => v.Person.Id === person.person?.Id)}
            eventsToShow={["Отпуск", "Командировка", "Учеба"]}
            onDataUpdate={(newData) => {
              CalendarSource.UsersCalendarData = newData;
            }}
          />
        </div>
      )}
    </>
  );*/
};
