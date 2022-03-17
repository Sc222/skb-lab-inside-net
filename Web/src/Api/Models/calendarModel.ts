import { PersonModel } from "./personModel";

export interface CalendarModel {
    id?: string;
    person: PersonModel;
    subject?: string;
    managerComment: string;
    startTime: string;
    endTime: string;
}

export type CalendarModelOnlyWithPersonId = Omit<CalendarModel, "person"> & { person: { id?: string } };

export interface CalendarModelMapped {
    Id?: string;
    PersonId: string; // needed for data grouping in departmentCalendar
    Person: PersonModel;
    Subject: string;
    ManagerComment: string;
    StartTime: string;
    EndTime: string;
}

const SubjectFallbackString = "Неизвестный тип события";

export const CalendarModelToScheduleComponentData = (calendar: CalendarModel): CalendarModelMapped => ({
    Id: calendar.id,
    PersonId: calendar.person.id ?? "",
    Person: calendar.person,
    Subject: calendar.subject ?? SubjectFallbackString,
    ManagerComment: calendar.managerComment,
    StartTime: calendar.startTime,
    EndTime: calendar.endTime,
});

export const ScheduleComponentDataToCalendarModel = (
    calendar: CalendarModelMapped,
    shouldRemoveCalendarId: boolean,
    personToOverride?: PersonModel // overrides only if calendar.person is undefined
): CalendarModelOnlyWithPersonId => {
    let finalPerson = calendar.Person;
    if (!finalPerson && personToOverride) {
        //fixme remove this
        finalPerson = personToOverride;
    }
    return {
        id: shouldRemoveCalendarId ? undefined : calendar.Id,
        person: { id: finalPerson.id },
        subject: calendar.Subject === SubjectFallbackString ? undefined : calendar.Subject,
        managerComment: calendar.ManagerComment,
        startTime: calendar.StartTime,
        endTime: calendar.EndTime,
    };
};
