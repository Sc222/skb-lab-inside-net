export class Api {
    public static get ApiRoot(): string {
        switch (process.env.NODE_ENV) {
            case "production": {
                let productionApiRoot = process.env.PRODUCTION_API_ROOT;
                if (!productionApiRoot) {
                    throw new Error("Please specify api root for production using 'PRODUCTION_API_ROOT' env variable");
                }
                return productionApiRoot;
            }
            default:
                return "https://localhost:8080";
        }
    }
}
