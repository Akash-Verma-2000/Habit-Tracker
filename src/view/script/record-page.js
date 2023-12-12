// Create a new Date object to get the current date and time
const currentDate = new Date();

// Array of weekday names
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Get the day of the week (0-6) from the Date object
const dayOfWeekIndex = currentDate.getDay();

// Get the name of the day from the array using the index obtained
const dayOfWeek = daysOfWeek[dayOfWeekIndex];

// Get the current date
const date = currentDate.getDate();

// Get the current month (January is 0, so adding 1 to get the actual month)
const month = currentDate.getMonth() + 1;

// Get the current year
const year = currentDate.getFullYear();

//THIS FUNCTION WRITES THE CURRENT DATE ON THE RECORD-PAGE 
function getDate() {
    document.getElementById("todays-date").innerHTML = `${dayOfWeek}, ${date}/${month}/${year}`;
}
getDate();

//THIS FUNCTION MAINTAINS THE SEQUENCE OF WEEK DAYS FOR EVERY NEW DAY
function setWeekSequence() {
    //THIS ARRAY CONTAINS THE CURRENT SEQUENCE OF WEEK DAYS 
    const sequencedWeek = [];
    let j = 0;
    //PUTTING WEEK DAYS IN CURRECT SEQUENCE TO THE ABOVE ARRAY
    for (let i = 0; i < daysOfWeek.length; i++) {
        if (i <= dayOfWeekIndex) {
            sequencedWeek.push(daysOfWeek[i]);
        } else {
            sequencedWeek.unshift(daysOfWeek[6 - j]);
            j++;
        }
    }

    //WRITTING THE WEEK DAYS IN THE SEQUENCE TO THE RECORD-PAGE
    for (i = 0; i < sequencedWeek.length; i++) {
        document.getElementById(i).innerHTML = sequencedWeek[i];
    }
}
setWeekSequence();

