import { AuthScope } from "../Typings/Enums/authScope";

export class AuthScopesSets {
    public static get AllWithUnknown(): Set<AuthScope> {
        return new Set(Object.values(AuthScope));
    }

    public static get All(): Set<Exclude<AuthScope, AuthScope.unknown>> {
        return new Set(
            Object.values(AuthScope).filter((s): s is Exclude<AuthScope, AuthScope.unknown> => {
                return s !== AuthScope.unknown;
            })
        );
    }
}
