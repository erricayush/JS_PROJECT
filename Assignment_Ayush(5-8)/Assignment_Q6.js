// "Q6. Build a dynamic event scheduling system that allows users to create, update, and manage events. This assignment will help you practice advanced function concepts like default parameters, callbacks, closures, and more.

// 1. Function Setup with Default Parameters:
//    - Create a function `createEvent(name, date, location = 'TBA')` that creates an event with a name, date, and an optional location. If no location is provided, it defaults to 'TBA'.

// 2. Handling Callbacks:z
//    - Write a function `notifyUser(event, callback)` that takes an event object and a callback function. The callback should be executed when the event is created. For example, you could use a callback to send an email or display a notification.

// 3. Higher-Order Functions:
//    - Create a function `eventReminder(reminderTime, callback)` that returns a function. This returned function should set a reminder for the event based on the `reminderTime` provided and call the `callback` function when the reminder time is reached.

// 4. Using `call`, `apply`, and `bind`:
//    - Implement a function `logEventDetails` that logs the details of an event. Use `call` and `apply` to log event details with different contexts. Use `bind` to create a new function that always logs events with a specific message prefix.

// 5. Immediately Invoked Function Expressions (IIFE):
//    - Use an IIFE to create a private scope for managing event data, ensuring that the data is not accessible from the global scope.

// 6. Closures:
//    - Write a function `createEventManager()` that returns an object with methods to add, update, and list events. Use closures to encapsulate the event data and only expose methods to interact with it.

// 7. Refactoring and Testing:
//    - Ensure that your code is clean and follows best practices. Refactor any redundant or repetitive logic and thoroughly test your functions.

// # Bonus:

// - Implement functionality to handle multiple reminders for different times using closures and callbacks.
// - Add a feature to automatically send a notification when an event is updated."


// 1. Function Setup with Default Parameters:
//    - Create a function `createEvent(name, date, location = 'TBA')` that creates an event with a name, date, and an optional location. If no location is provided, it defaults to 'TBA'.





const eventList = [];
function createEvent(name, date, location = 'TBA') {
    const event = {
        name: name,
        date: new Date(date),
        location: location
    };
    eventList.push(event)
    return event;
};
console.log(eventList)

createEvent('holi', '04-03-2026');
// console.log(event)


// 2. Handling Callbacks:z
//    - Write a function `notifyUser(event, callback)` that takes an event object and a callback function. The callback should be executed when the event is created. For example, you could use a callback to send an email or display a notification.

function printMessage() {
    console.log("hi ! event is created. ")
}


function notifyUser(event, callback) {

    console.log(`Notification for: ${event.name}`);
    callback();
}

const myEvent = createEvent('Birthday', '29-12-2003', 'Barabanki');
notifyUser(myEvent, printMessage);


// 3. Higher-Order Functions:
//    - Create a function `eventReminder(reminderTime, callback)` that returns a function. This returned function should set a reminder for the event based on the `reminderTime` provided and call the `callback` function when the reminder time is reached.

function timerReached() {
    console.log("hi! Timer Reached");
}

function eventReminder(reminderTime, callback) {

    return setTimeout(() => {
        callback();
    }, reminderTime)

}

eventReminder(3000, timerReached);



// 4. Using `call`, `apply`, and `bind`:
//    - Implement a function `logEventDetails` that logs the details of an event. Use `call` and `apply` to log event details with different contexts. Use `bind` to create a new function that always logs events with a specific message prefix.


const event1 = createEvent('anniversary', '11-11-2026')
const event2 = createEvent('birthday', '11-11-2026')
function logEventDetails(date, location) {
    console.log(`  your ${this.name} is on ${date} in ${location}  `)

}

//call-----------------------
logEventDetails.call(event1, '01-01-2005', 'royal hotel');

//apply-----------------------
logEventDetails.apply(event2, ['19-05-2009', 'taj'])

//bind-------------------------

const newFunction = logEventDetails.bind(event1, '02-10-2007', 'manali');
newFunction();


//5----------------------------------------------------------------------------------------------------

function invoked() {
    const list = [1, 2, 3, 4, 5, 67];
    console.log(list);
    return (() => {
        return list;
    })();
}
const varibal = invoked();


varibal.push(3)
console.log(varibal)



// 6. Closures:
//    - Write a function `createEventManager()` that returns an object with methods to add, update, and list events. Use closures to encapsulate the event data and only expose methods to interact with it.

function createEventManager() {

    const list = [];


    // const newEvent = createEvent('diner', '2026-10-16', 'delhi')
    // console.log(newEvent);
    const obj = {
        add: function add(name, date, location) {
            const obj1 = {
                name: name,
                date: new Date(date),
                location: location
            }
            list.push(obj1);
          

        },
        update: function update(name, event) {

            list.forEach((data) => {
                if (data.name == name) {
                    data.name = event.name;
                    data.date = event.date;
                    data.location = event.location;
                    // notification();
                    notification();

                }
                
            })
            
        },
        eventList: () => {
             console.log(list)
        }

    }
    return obj
}

const events = createEventManager();
events.add('ram', '2012-12-25', 'mumbai');
events.add('lunch', '2026-02-24', 'mumbai');

const objj = {
    name: 'breakfast',
    date: '2016-03-26',
    location: 'punjab'
}

//will print the updated list
events.update('ram', objj)

//will print the list of events
events.eventList()

// # Bonus:

// - Implement functionality to handle multiple reminders for different times using closures and callbacks.
// - Add a feature to automatically send a notification when an event is updated."


function notification() {
    console.log('hi! event is updated')
}


