export default function date(date: Date) {
  let daytemp = date.toString().split(" ");
  switch (daytemp[1]) {

    case "Jan":
      daytemp[1] = "01";
      break;
    case "Feb":
      daytemp[1] = "02";
      break;
    case "Mar":
      daytemp[1] = "03";
      break;
    case "Apr":
      daytemp[1] = "04";
      break;
    case "May":
      daytemp[1] = "05";
      break;
    case "Jun":
      daytemp[1] = "06";
      break;
    case "Jul":
      daytemp[1] = "07";
      break;
    case "Aug":
      daytemp[1] = "08";
      break;
    case "Sep":
      daytemp[1] = "09";
      break;
    case "Oct":
      daytemp[1] = "10";
      break;
    case "Nov":
      daytemp[1] = "11";
      break;
    case "Dec":
      daytemp[1] = "12";
      break;
  }
  return `${daytemp[3]}-${daytemp[1]}-${daytemp[2]}`;
}
