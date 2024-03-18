export function toDateString(date) {
  if (date < 10) {
    return "0" + String(date);
  } else {
    return String(date);
  }
}

export function numToMoney(num) {
  let res =
    String(num).replace(
      /(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/gm,
      "$1$2."
    ) + "đ";
  res = res.replace(/^0+/, "");
  if (res === "đ") return "0đ";
  else return res;
}

export function createArray(N) {
  return Array.apply(null, { length: N }).map(Number.call, Number);
}

export function getCurrentTime() {
  let d = new Date();
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
  };
}
