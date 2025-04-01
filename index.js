// Your code here
// Create an employee record from an array
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Create multiple employee records from an array of arrays
function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

// Create a time-in event for an employee
function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Create a time-out event for an employee
function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Calculate all wages for an employee
function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

// Calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}