//todo think about a way of getting all scopes  from server and managing areas each scope can access (without hardcoding it)
export enum AuthScope {
    unknown = "unknown", // all unknown server scopes go here
    regularUser = "regular",
    departmentManager = "departmentManager",
    slackAdmin = "slackAdmin",
    admin = "admin",
}
