const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const array = [
  {
    name: "6th generation",
    expenseType: "grocery",
    amount: 308,
    date: "11-04-2024",
  },
  {
    name: "system engine",
    expenseType: "food",
    amount: 759,
    date: "09-04-2024",
  },
  {
    name: "Organized",
    expenseType: "food",
    amount: 984,
    date: "05-04-2024",
  },
  {
    name: "success",
    expenseType: "grocery",
    amount: 826,
    date: "05-04-2024",
  },
  {
    name: "flexibility",
    expenseType: "grocery",
    amount: 815,
    date: "11-04-2024",
  },
  {
    name: "content-based",
    expenseType: "food",
    amount: 163,
    date: "02-04-2024",
  },
  {
    name: "Graphical User Interface",
    expenseType: "other",
    amount: 849,
    date: "03-04-2024",
  },
  {
    name: "bifurcated",
    expenseType: "travel",
    amount: 895,
    date: "03-04-2024",
  },
  {
    name: "support",
    expenseType: "travel",
    amount: 665,
    date: "03-04-2024",
  },
  {
    name: "client-server",
    expenseType: "other",
    amount: 331,
    date: "07-04-2024",
  },
];

const supArray = ["st", "nd", "rd", "th"];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function week() {
  let date = new Date();
  const start = date.getDate() - date.getDay();
  let dateArray = [];
  for (var i = 1; i <= 7; i++) {
    const newDate = new Date(date.getFullYear(), date.getMonth(), start + i);
    let dateString = String(
      newDate.getDate().toString().padStart(2, "0") +
        "-" +
        (newDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        newDate.getFullYear().toString()
    );
    dateArray.push(dateString);
  }

  console.log(dateArray);
}
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function getMonth() {
  const date = new Date();
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  return formatDate(startDate);
}

function getMonthDates() {
  const date = new Date();
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let dateArray = [];
  const ending = parseInt(lastDate.getDate());
  for (var i = 1; i <= ending; i++) {
    const newDate = new Date(date.getFullYear(), date.getMonth(), i);
    let dateString = String(
      newDate.getDate().toString().padStart(2, "0") +
        "-" +
        (newDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        newDate.getFullYear().toString()
    );
    dateArray.push(dateString);
  }
  return dateArray;
}

function getDateOfMonthsForFrontend() {
  const monthArray = getMonthDates();
  const date = new Date("2024-04-11T00:00:00.000Z");
  console.log(date.getMonth());
  console.log(monthArray);
}
// console.log(getDateOfMonthsForFrontend());

function getDatesInCurrentMonthWithTimes(
  startTime = "00:00:00",
  endTime = "18:30:00"
) {
  const today = new Date();
  const thisMonth = today.getMonth(); // 0-11 for month
  const daysInMonth = new Date(today.getFullYear(), thisMonth + 1, 0).getDate();
  const dates = [];
  for (let i = 0; i < daysInMonth; i++) {
    const currentDate = new Date(today.getFullYear(), thisMonth, i + 1);
    const formattedEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      parseInt(endTime.split(":")[0]),
      parseInt(endTime.split(":")[1]),
      parseInt(endTime.split(":")[2]),
      0 // Milliseconds set to 0
    ).toISOString();

    dates.push(formattedEndDate);
  }

  return dates.map((date) => {
    return date.replace("T13:00:00.000Z", "T00:00:00.000Z");
  });
}

// Example usage
const dates = getDatesInCurrentMonthWithTimes();

console.log(dates);
