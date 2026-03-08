// "Q5. Develop a student enrollment system that manages student information, including personal details and courses they are enrolled in. This assignment will help you practice using modern JavaScript features like destructuring, spread operators, rest parameters, and data structures such as sets and maps.


// 1. Data Structure Setup:
//    - Use a `Map` to store student data, where each key is a student ID and the value is an object containing the student’s name, age, and a list of enrolled courses (an array).
//    - Example:

//      const students = new Map();
//      students.set(1, { name: 'Alice', age: 22, courses: ['Math', 'Science'] });
//      students.set(2, { name: 'Bob', age: 25, courses: ['History', 'Art'] });

// 2. Destructuring:
//    - Write a function `getStudentInfo(id)` that uses destructuring to extract and return the student's name and age based on the provided ID.

// 3. Spread Operator:
//    - Create a function `addCourse(id, newCourse)` that adds a new course to the student’s list of courses using the spread operator.

// 4. Rest Parameters:
//    - Write a function `addCourses(id, ...courses)` that allows adding multiple courses at once to the student’s list.

// 5. Modern Operators:
//    - Use the nullish coalescing operator (`??`) to handle cases where a student ID might not exist in the `Map`, and return a default message if the student is not found.
//    - Implement short-circuiting with `&&` and `||` to manage cases where certain properties might be missing.

// 6. Sets:
//    - Create a `Set` to store unique course names across all students and write a function `getUniqueCourses()` that returns a list of all unique courses.

// 7. String Manipulation:
//    - Implement a function `formatStudentInfo(id)` that returns a formatted string containing the student’s name, age, and a comma-separated list of their courses.
//    - Use methods such as `join()`, `trim()`, and template literals.
// "




const student = new Map();

function addStudentDetails(id, name, age, courses) {
    const obj = {
        name: name,
        age: age,
        courses: courses,
    }
    student.set(id, obj)
}


addStudentDetails(1, 'Alice', 22, ['Math', 'Science', 'Math'])
addStudentDetails(2, 'Bob', 25, ['History', 'Art', 'polity'])
addStudentDetails(3, 'Jon', 35, ['polity', 'FineArts', 'math', 'Science'])
addStudentDetails(4, 'Sio', 19, ['Geography', 'mth-2', 'History'])
console.log(student)



//2nd-----------------------
console.log("---------------2nd ---------")
const getStudentInfo = (id) => {
    const stud = student.get(id);
    if (!stud) return "Student not found";
    
    const { name, age } = stud; 
    return { name, age };
};

console.log(getStudentInfo(2))

//3rd--- Spread Operator-----------------------
console.log("---------------3rd ---------")

const addCourse = function (id, newCourse) {
    const studentData = student.get(id);
    if (studentData && Array.isArray(studentData.courses)) {
        studentData.courses=[...studentData.courses,newCourse]
    }

}
addCourse(1, 'JavaScript');
console.log(student.get(1))
// console.log(...student.get(1).courses)
// console.log(student.get(3).name)
// console.log(student.get(2).courses)


//4 REST PARAMETERS----------------------------
console.log("---------------4TH ---------")

function addCourses(id, addOns) {
    const studentDetails = student.get(id);
    if (studentDetails && Array.isArray(studentDetails.courses)) {
        studentDetails.courses.push(...addOns);
    }

}

addCourses(3, ['html', 'c++', 'java', 'C#']);
console.log(student.get(3));


//5th Modern Operators------------------------------
console.log("---------------5TH ---------")
function nullish(id) {
       const  studentId = student.get(id)  ?? `Student of ID ${id} does not exist`;
       return studentId;
}

console.log(nullish(5));

// 6. Sets:
//    - Create a `Set` to store unique course names across all students and write a function `getUniqueCourses()` that returns a list of all unique courses.
console.log("---------------6th ---------")

const uniqueCourse = new Set();
// uniqueCourse.add()

for (const [id, data] of student) {
    data.courses.forEach(course => uniqueCourse.add(course))
}
console.log(uniqueCourse);

function getUniqueCourses(map) {
    return uniqueCourse;
}

getUniqueCourses(uniqueCourse);


// 7. String Manipulation:
//    - Implement a function `formatStudentInfo(id)` that returns a formatted string containing the student’s name, age, and a comma-separated list of their courses.
//    - Use methods such as `join()`, `trim()`, and template literals.

console.log("---------------7th ---------")

function formatStudentInfo(id) {
    const studentInfo = student.get(id);
    console.log(`${studentInfo.name} is ${studentInfo.age} and he is enrolled in  ${studentInfo.courses.join(',')}`)

}

formatStudentInfo(4)

