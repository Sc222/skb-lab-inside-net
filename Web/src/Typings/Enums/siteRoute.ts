// those are RELATIVE site routes (create relative and absolute routes !)
export enum SiteRoute {
    //root routes
    home = "/",
    login = "/login",
    register = "/register",
    persons = "/persons",

    //other routes are relative without /

    // nested /persons routes
    search = "search",
    personId = ":personId",

    // persons/:personId nested routes
    profile = "profile",
    editProfile = "edit-profile",
    manageAccess = "manage-access", //todo add TABS nav using search params (?tab=SOMETHING)
    timeOff = "time-off",
    //TODO!!! all new extended plugin links go here (ex. timetable, ...)
}
