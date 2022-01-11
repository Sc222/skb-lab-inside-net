export class MockUtils {
    public static get LargeRequestDelay(): number {
        return 200;
    }

    public static get SmallRequestDelay(): number {
        return 100;
    }

    public static GenerateTokenExpirationDate(tokenAliveTimeSec: number): number {
        return new Date(Date.now() + 1000 * tokenAliveTimeSec).getTime();
    }
}
