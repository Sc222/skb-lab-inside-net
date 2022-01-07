export type UserAgentStatement = (userAgent: string) => boolean;

export class UserAgentStatements {
    public static IsYandexBrowser: UserAgentStatement = (userAgent) => userAgent.search(/YaBrowser/) > 0;
    public static IsNotYandexBrowser: UserAgentStatement = (userAgent) =>
        !UserAgentStatements.IsYandexBrowser(userAgent);
}
