// "Q8. Create an event countdown application that manages and displays upcoming events, calculates time differences, and formats dates and numbers. This assignment will help you practice number conversions, math operations, date handling, and using timers.

// 1. Event Data Setup:
//    - Create an array `events` where each element is an object representing an event. Each object should have properties `id`, `name`, `date`, and `description`.

//    Example:
//    const events = [
//      { id: 1, name: 'New Year Party', date: new Date('2025-01-01'), description: 'Celebrate the new year!' },
//      { id: 2, name: 'Summer Festival', date: new Date('2024-06-15'), description: 'Enjoy the summer festival!' },
//      { id: 3, name: 'Tech Conference', date: new Date('2024-10-10'), description: 'Attend the latest tech conference.' }
//    ];

// 2. Date Operations:
//    - Write a function `daysUntilEvent(eventId)` that calculates and returns the number of days remaining until the specified event using the `Date` object.

// 3. Internationalizing Dates:
//    - Use the `Intl.DateTimeFormat` object to format event dates in a human-readable format. Create a function `formatEventDate(eventId)` that returns the event date in a formatted string.

// 4. Timers:
//    - Implement a countdown timer for the next upcoming event. Use `setInterval` to update and display the countdown every second. The countdown should show days, hours, minutes, and seconds remaining.

// 5. Number Conversions and Math Operations:
//    - Use `Math` methods to calculate and round the total days until each event. Create a function `getEventSummary()` that calculates the average number of days until all upcoming events.

// 6. Numeric Separators:
//    - Format the total number of days remaining for each event using numeric separators for readability (e.g., `1_000_000`).

// 7. BigInt:
//    - If needed, demonstrate using `BigInt` to handle large numbers, such as large counts of events or time measurements.

// 8. Refactoring and Testing:
//    - Refactor your code for readability and efficiency. Ensure that all functions are well-tested and handle edge cases, such as past dates or invalid event IDs."

//1-------------------------------------------------------------------

const events = [];

function event(id, name, date, discription) {
    const obj = {
        id: id,
        name: name,
        date: new Date(date),
        discription: discription
    }
    events.push(obj);
    return obj;

}

console.log(events)

event(1, 'New Year Party', '2027-01-01', 'Celebrate the new year!');
event(2, 'Summer Festival', '2026-06-15', 'Enjoy the summer festival!')
event(3, 'Tech Conference', '2026-10-10', 'Attend the latest tech conference.')
event(4, 'Induction Program', '2026-02-20', 'Induction for knowledge')
event(5, 'birthday', '2024-02-20', 'party for birthday')

//2------------------------------------------------------------------

const daysUntilEvent = function (eventId) {
    const today = new Date();

    const msDay = 1000 * 60 * 60 * 24;
    for (const eve of events) {
        if (eve.id === eventId) {
            const eventDate = new Date(eve.date);

            const days = Math.ceil((eventDate - today) / msDay);
            if(days<0) return `event has been done on ${eventDate.toLocaleDateString()}`;
            else if (days > 0) {
                return `${days} days remaining for ${eve.name}`;
            } else if (days === 0) {
                return `Today is the day for ${eve.name}!`;
            } else {
                return 'event completed';
            }

        }
    }

    return 'event not found'

}

console.log(daysUntilEvent(3));


//3------------------------------------------------------------------------


function formatEventDate(eventId) {
    events.forEach((eve) => {
        if (eve.id === eventId) {
            const newDate = eve.date;
            const formattedDate = newDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })

            return console.log(formattedDate);

        }
    })
}

formatEventDate(4)


//4--------------------------------------------------------------------------

function countdownEvent(eventId) {
    events.forEach((eve) => {

        if (eve.id === eventId) {
            setInterval(() => updateCountDown(eve.date), 1000);
        }
    })

}

const updateCountDown = (deadline) => {
    const day = document.querySelector('.day')
    const hour = document.querySelector('.hours')
    const minutes = document.querySelector('.minutes')
    const seconds = document.querySelector('.seconds')


    const today = new Date();
    
    const diff = Math.ceil(deadline - today);

     if (diff <= 0) {
            console.log("Event Started!");
            clearInterval(countdownInterval);
            return;
    }
   
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / 1000 / 60) % 60);
    const sec = Math.floor((diff / 1000) % 60);  
    day.textContent = days
    hour.textContent = hours
    minutes.textContent = min
    seconds.textContent = sec

    // console.log(`${days} days ${hours} hours ${min} minutes and ${sec} seconds remaining for the event`)

}

countdownEvent(2);



//5-------------------------------------------------------------------------------

function getEventSummary() {

    const today = new Date();

    const dayArr = [];
    const msDay = 1000 * 60 * 60 * 24;
    for (const eve of events) {
        const eveDate = new Date(eve.date)
        day = Math.floor((eveDate - today) / msDay);
        if(day<0) continue;
        
        dayArr.push(day);

    }
    // console.log(dayArr)

    const totalDays = dayArr.reduce((acc, curr) => {
        
        return total = acc + curr;

    }, 0)

    const avgDayForEvents = totalDays / dayArr.length


    return `average ${avgDayForEvents} days is remaining for events`

}

console.log(getEventSummary())


//6---------------------------------------------------------------

function formatDay() {
    const today = new Date();

    for (const eve of events) {       
            const eventDate = new Date(eve.date);
            
            const daysInMilisecond = Math.ceil(eventDate - today) ;
            if(daysInMilisecond<0) continue;
            const formatted = new Intl.NumberFormat('en-US').format(daysInMilisecond).replace(/,/g, '_');
            console.log(formatted)
    
       
    }
}

formatDay()

//7------------------------------------------------
function showBigTime() {

    const billionMs = 1_000_000_000; 
  
    const msToNano = (ms) => BigInt(ms) * 1_000_000n;
    
    console.log(`1 Billion MS in Nanoseconds: ${msToNano(billionMs)}n`);
}

showBigTime()

