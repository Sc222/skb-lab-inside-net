import { DepartmentModel } from "../Models/departmentModel";

// Used as demo mock db, can be updated during run by "post", "update" and "put requests"
export const MockDepartments: DepartmentModel[] = [
    {
        Id: "7bf8f0b8-9ad8-437d-9f04-9685ed417fad",
        Name: "Отдел мобильной разработки",
    },
    {
        Id: "5a09d37f-9083-4e61-8f8e-994150f626e0",
        Name: "Отдел администрирования",
    },
    {
        Id: "2987ae25-9e3d-45a4-bbf7-3c5c775455b2",
        Name: "Отдел бекенд разработки",
    },
];
