import { DepartmentModel } from "../Models/departmentModel";

// Used as demo mock db, can be updated during run by "post", "update" and "put requests"
export const MockDepartments: DepartmentModel[] = [
    {
        id: "7bf8f0b8-9ad8-437d-9f04-9685ed417fad",
        name: "Отдел мобильной разработки",
    },
    {
        id: "5a09d37f-9083-4e61-8f8e-994150f626e0",
        name: "Отдел администрирования",
    },
    {
        id: "2987ae25-9e3d-45a4-bbf7-3c5c775455b2",
        name: "Отдел бекенд разработки",
    },
];
