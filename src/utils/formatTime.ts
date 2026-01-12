export function formatOrderTime(time: string) {
    const date = new Date(time); // 正式發布會自動換成使用者當地時區

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const period = hours >= 12 ? "下午" : "上午";
    hours = hours % 12 || 12;

    return `${year}/${month}/${day} ${period} ${hours}:${minutes}`;
}