import { PersonModel } from "../../../Api/Models/personModel";
import { MockPersons } from "../../../Api/TestingMocks/mockPersons";
import { v4 } from "uuid";

export interface CalendarData {
    Id: string;
    Subject: string;
    StartTime: string;
    EndTime: string;
    Person: PersonModel;
    PersonId: string;
}

export const CalendarSource: { UsersCalendarData: CalendarData[] } = {
    UsersCalendarData: [
        // Крылова Анастасия
        {
            Id: v4(),
            Subject: "Отпуск",
            PersonId: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Person: MockPersons.get("33bc751f-a56b-4704-bfb6-03239f04dcfc")!,
            StartTime: "2022-01-03",
            EndTime: "2022-01-09",
        },
        {
            Id: v4(),
            Subject: "Командировка",
            PersonId: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Person: MockPersons.get("33bc751f-a56b-4704-bfb6-03239f04dcfc")!,
            StartTime: "2022-01-10",
            EndTime: "2022-01-13",
        },
        {
            Id: v4(),
            PersonId: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Person: MockPersons.get("33bc751f-a56b-4704-bfb6-03239f04dcfc")!,
            Subject: "Учеба",
            StartTime: "2022-01-19",
            EndTime: "2022-01-20",
        },
        // Гусева Мария
        {
            Id: v4(),
            Subject: "Отпуск",
            PersonId: "3f3b75de-efcd-48aa-a59e-e805496467e1",
            Person: MockPersons.get("3f3b75de-efcd-48aa-a59e-e805496467e1")!,
            StartTime: "2022-01-03",
            EndTime: "2022-01-09",
        },
        {
            Id: v4(),
            Subject: "Командировка",
            PersonId: "3f3b75de-efcd-48aa-a59e-e805496467e1",
            Person: MockPersons.get("3f3b75de-efcd-48aa-a59e-e805496467e1")!,
            StartTime: "2022-01-14",
            EndTime: "2022-01-16",
        },
        {
            Id: v4(),
            Subject: "Учеба",
            PersonId: "3f3b75de-efcd-48aa-a59e-e805496467e1",
            Person: MockPersons.get("3f3b75de-efcd-48aa-a59e-e805496467e1")!,
            StartTime: "2022-01-19",
            EndTime: "2022-01-20",
        },
        // Шульц Наталья
        {
            Id: v4(),
            Subject: "Отпуск",
            PersonId: "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
            Person: MockPersons.get("ad59dd3c-bdec-4cc8-bb72-e460479a77e7")!,
            StartTime: "2022-01-03",
            EndTime: "2022-01-09",
        },
        {
            Id: v4(),
            Subject: "Командировка",
            PersonId: "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
            Person: MockPersons.get("ad59dd3c-bdec-4cc8-bb72-e460479a77e7")!,
            StartTime: "2022-01-17",
            EndTime: "2022-01-20",
        },
        {
            Id: v4(),
            PersonId: "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
            Person: MockPersons.get("ad59dd3c-bdec-4cc8-bb72-e460479a77e7")!,
            Subject: "Учеба",
            StartTime: "2022-01-13",
            EndTime: "2022-01-14",
        },
    ],
};

export const dataSource = {
    scheduleData: [
        {
            Id: 1,
            Subject: "Explosion of Betelgeuse Star",
            Location: "Space Center USA",
            StartTime: "2021-01-10T04:00:00.000Z",
            EndTime: "2021-02-10T05:30:00.000Z",
            CategoryColor: "#1aaa55",
        },
        {
            Id: 2,
            Subject: "Thule Air Crash Report",
            Location: "Newyork City",
            StartTime: "2021-01-11T06:30:00.000Z",
            EndTime: "2021-03-11T08:30:00.000Z",
            CategoryColor: "#357cd2",
        },
        {
            Id: 3,
            Subject: "Blue Moon Eclipse",
            Location: "Space Center USA",
            StartTime: "2021-01-12T04:00:00.000Z",
            EndTime: "2021-01-12T05:30:00.000Z",
            CategoryColor: "#7fa900",
        },
        {
            Id: 4,
            Subject: "Meteor Showers in 2021",
            Location: "Space Center USA",
            StartTime: "2021-01-13T07:30:00.000Z",
            EndTime: "2021-01-13T09:00:00.000Z",
            CategoryColor: "#ea7a57",
        },
        {
            Id: 5,
            Subject: "Milky Way as Melting pot",
            Location: "Space Center USA",
            StartTime: "2021-01-14T06:30:00.000Z",
            EndTime: "2021-01-14T08:30:00.000Z",
            CategoryColor: "#00bdae",
        },
        {
            Id: 6,
            Subject: "Mysteries of Bermuda Triangle",
            Location: "Bermuda",
            StartTime: "2021-01-14T04:00:00.000Z",
            EndTime: "2021-01-14T05:30:00.000Z",
            CategoryColor: "#f57f17",
        },
        {
            Id: 7,
            Subject: "Glaciers and Snowflakes",
            Location: "Himalayas",
            StartTime: "2021-01-15T05:30:00.000Z",
            EndTime: "2021-01-15T07:00:00.000Z",
            CategoryColor: "#1aaa55",
        },
        {
            Id: 8,
            Subject: "Life on Mars",
            Location: "Space Center USA",
            StartTime: "2021-01-16T03:30:00.000Z",
            EndTime: "2021-01-16T04:30:00.000Z",
            CategoryColor: "#357cd2",
        },
        {
            Id: 9,
            Subject: "Alien Civilization",
            Location: "Space Center USA",
            StartTime: "2021-01-18T05:30:00.000Z",
            EndTime: "2021-01-18T07:30:00.000Z",
            CategoryColor: "#7fa900",
        },
        {
            Id: 10,
            Subject: "Wildlife Galleries",
            Location: "Africa",
            StartTime: "2021-01-20T05:30:00.000Z",
            EndTime: "2021-01-20T07:30:00.000Z",
            CategoryColor: "#ea7a57",
        },
        {
            Id: 11,
            Subject: "Best Photography 2021",
            Location: "London",
            StartTime: "2021-01-21T04:00:00.000Z",
            EndTime: "2021-01-21T05:30:00.000Z",
            CategoryColor: "#00bdae",
        },
        {
            Id: 12,
            Subject: "Smarter Puppies",
            Location: "Sweden",
            StartTime: "2021-01-08T04:30:00.000Z",
            EndTime: "2021-01-08T06:00:00.000Z",
            CategoryColor: "#f57f17",
        },
        {
            Id: 13,
            Subject: "Myths of Andromeda Galaxy",
            Location: "Space Center USA",
            StartTime: "2021-01-06T05:00:00.000Z",
            EndTime: "2021-01-06T07:00:00.000Z",
            CategoryColor: "#1aaa55",
        },
        {
            Id: 14,
            Subject: "Aliens vs Humans",
            Location: "Research Center of USA",
            StartTime: "2021-01-05T04:30:00.000Z",
            EndTime: "2021-01-05T06:00:00.000Z",
            CategoryColor: "#357cd2",
        },
        {
            Id: 15,
            Subject: "Facts of Humming Birds",
            Location: "California",
            StartTime: "2021-01-19T04:00:00.000Z",
            EndTime: "2021-01-19T05:30:00.000Z",
            CategoryColor: "#7fa900",
        },
        {
            Id: 16,
            Subject: "Sky Gazers",
            Location: "Alaska",
            StartTime: "2021-01-22T05:30:00.000Z",
            EndTime: "2021-01-22T07:30:00.000Z",
            CategoryColor: "#ea7a57",
        },
        {
            Id: 17,
            Subject: "The Cycle of Seasons",
            Location: "Research Center of USA",
            StartTime: "2021-01-11T00:00:00.000Z",
            EndTime: "2021-01-11T02:00:00.000Z",
            CategoryColor: "#00bdae",
        },
        {
            Id: 18,
            Subject: "Space Galaxies and Planets",
            Location: "Space Center USA",
            StartTime: "2021-01-11T11:30:00.000Z",
            EndTime: "2021-01-11T13:00:00.000Z",
            CategoryColor: "#f57f17",
        },
        {
            Id: 19,
            Subject: "Lifecycle of Bumblebee",
            Location: "San Fransisco",
            StartTime: "2021-01-14T00:30:00.000Z",
            EndTime: "2021-01-14T02:00:00.000Z",
            CategoryColor: "#7fa900",
        },
        {
            Id: 20,
            Subject: "Alien Civilization",
            Location: "Space Center USA",
            StartTime: "2021-01-14T10:30:00.000Z",
            EndTime: "2021-01-14T12:30:00.000Z",
            CategoryColor: "#ea7a57",
        },
        {
            Id: 21,
            Subject: "Alien Civilization",
            Location: "Space Center USA",
            StartTime: "2021-01-10T08:30:00.000Z",
            EndTime: "2021-01-10T10:30:00.000Z",
            CategoryColor: "#ea7a57",
        },
        {
            Id: 22,
            Subject: "The Cycle of Seasons",
            Location: "Research Center of USA",
            StartTime: "2021-01-12T09:00:00.000Z",
            EndTime: "2021-01-12T10:30:00.000Z",
            CategoryColor: "#00bdae",
        },
        {
            Id: 23,
            Subject: "Sky Gazers",
            Location: "Greenland",
            StartTime: "2021-01-15T09:00:00.000Z",
            EndTime: "2021-01-15T10:30:00.000Z",
            CategoryColor: "#ea7a57",
        },
        {
            Id: 24,
            Subject: "Facts of Humming Birds",
            Location: "California",
            StartTime: "2021-01-16T07:00:00.000Z",
            EndTime: "2021-01-16T09:00:00.000Z",
            CategoryColor: "#7fa900",
        },
    ],
    resourceSampleData: [
        {
            Id: 1,
            Subject: "Burning Man",
            StartTime: "2021-06-05T09:30:00.000Z",
            EndTime: "2021-06-05T11:30:00.000Z",
            OwnerId: 1,
        },
        {
            Id: 2,
            Subject: "Marketing Forum",
            StartTime: "2021-06-06T04:30:00.000Z",
            EndTime: "2021-06-06T06:00:00.000Z",
            OwnerId: 2,
        },
        {
            Id: 3,
            Subject: "Business Factory",
            StartTime: "2021-06-06T08:00:00.000Z",
            EndTime: "2021-06-06T09:30:00.000Z",
            OwnerId: 3,
        },
        {
            Id: 4,
            Subject: "Burning Man",
            StartTime: "2021-06-07T06:00:00.000Z",
            EndTime: "2021-06-07T07:30:00.000Z",
            OwnerId: 1,
        },
        {
            Id: 5,
            Subject: "Funnel Hacking",
            StartTime: "2021-06-08T04:00:00.000Z",
            EndTime: "2021-06-08T05:30:00.000Z",
            OwnerId: 3,
        },
        {
            Id: 6,
            Subject: "The human gathering",
            StartTime: "2021-06-08T07:30:00.000Z",
            EndTime: "2021-06-08T09:00:00.000Z",
            OwnerId: 2,
        },
        {
            Id: 7,
            Subject: "Techweek",
            StartTime: "2021-06-09T05:30:00.000Z",
            EndTime: "2021-06-09T07:00:00.000Z",
            OwnerId: 2,
        },
        {
            Id: 8,
            Subject: "Grow Conference",
            StartTime: "2021-06-10T04:30:00.000Z",
            EndTime: "2021-06-10T06:00:00.000Z",
            OwnerId: 1,
        },
        {
            Id: 9,
            Subject: "Data Science Conference",
            StartTime: "2021-06-10T08:00:00.000Z",
            EndTime: "2021-06-10T09:30:00.000Z",
            OwnerId: 1,
        },
        {
            Id: 10,
            Subject: "Blogcademy",
            StartTime: "2021-06-11T06:30:00.000Z",
            EndTime: "2021-06-11T08:00:00.000Z",
            OwnerId: 3,
        },
        {
            Id: 11,
            Subject: "World Domination Summit",
            StartTime: "2021-06-12T04:00:00.000Z",
            EndTime: "2021-06-12T05:30:00.000Z",
            OwnerId: 2,
        },
        {
            Id: 12,
            Subject: "Content Marketing",
            StartTime: "2021-06-12T07:30:00.000Z",
            EndTime: "2021-06-12T09:00:00.000Z",
            OwnerId: 1,
        },
        {
            Id: 13,
            Subject: "Mobile World Conference",
            StartTime: "2021-06-12T12:30:00.000Z",
            EndTime: "2021-06-12T14:30:00.000Z",
            OwnerId: 1,
        },
    ],
};
