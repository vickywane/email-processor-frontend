export function timeSince(date: any) {
  if (!date) return null;


  let minute = 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;
  let year = day * 365;

  let suffix = " ago";

  let elapsed = Math.floor((Date.now() - date) / 1000);

  if (elapsed < minute) {
    return "just now";
  }

  // get an array in the form of [number, string]
  let a = (elapsed < hour && [Math.floor(elapsed / minute), "minute"]) ||
    (elapsed < day && [Math.floor(elapsed / hour), "hour"]) ||
    (elapsed < month && [Math.floor(elapsed / day), "day"]) ||
    (elapsed < year && [Math.floor(elapsed / month), "month"]) || [
      Math.floor(elapsed / year),
      "year",
    ];

  // pluralise and append suffix
  return a[0] + " " + a[1] + (a[0] === 1 ? "" : "s") + suffix;
}
