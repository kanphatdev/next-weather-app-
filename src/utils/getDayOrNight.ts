

export default function getDayOrNightIcon(
    iconName: string,
    dateTimeString: string
): string {
    const hours = new Date(dateTimeString).getHours();
    const isDaysTime = hours >= 6 && hours < 18;
    return isDaysTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
