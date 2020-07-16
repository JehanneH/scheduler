# Interview Scheduler

The Interview Scheduler a React application that allows users to book and cancel interviews. Screenshots of the final product can be found further down.

This project was created and published by me as part of my learnings at [Lighthouse Labs.](https://www.lighthouselabs.ca/)

## Technical Specifications
- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Cypress

## Functional Requirements
- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

## Behavioural Requirements
- Interviews can be booked between Monday and Friday.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel or edit an existing interview.
- The list of days informs the user how many slots are available for each day and will update when an appointment is created or cancelled.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Screenshots

### Create a new appointment, specify student name and select an interviewer:
!["create a new appointment"](https://github.com/JehanneH/scheduler/blob/master/docs/createnewappointment.png?raw=true)

### Created appointment, when hovered over the edit and delete features are revealed:
!["appointment created"](https://github.com/JehanneH/scheduler/blob/master/docs/hoverviewofappointment.png?raw=true)

### If student wishes to delete appointment they will be asked for confirmation:
!["confirm before deleting appointment"](https://github.com/JehanneH/scheduler/blob/master/docs/confirmbeforedelete.png?raw=true)

### Error handling when appointment cannot be saved:
!["error handling"](https://github.com/JehanneH/scheduler/blob/master/docs/errorhandling.png?raw=true)