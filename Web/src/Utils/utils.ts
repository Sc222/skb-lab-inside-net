export class Utils {
    public static get Nbsp(): string {
        return "\u00A0";
    }

    public static ScrollWithOffset(element: HTMLElement, yOffset: number): void {
        const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
    }

    public static ScrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    public static DateToJsonWithTimezoneShift(date: Date): string {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON();
    }
}
