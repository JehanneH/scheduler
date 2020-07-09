import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import getAppointmentsForDay from "helpers/selectors"

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Jehanne Hodge",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Dana Scully",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Stella Gibson",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   }

// ];


export default function Application(props) {

  const [state, setState] = useState ({
    day: "Monday",
    days: [],
    appointments: {}
  })


  const appointments = getAppointmentsForDay(state, state.day);
  
  const schedule = appointments.map((appointment, index) => {
    return (
      <Appointment
        key={appointment.id} {...appointment}
      />
      )
  })

  const setDay = day => setState({ ...state, day });

 useEffect(() => {
  const daysPromise = axios.get(`/api/days`)
  const appointmentsPromise = axios.get(`/api/appointments`)

  Promise.all([daysPromise, appointmentsPromise]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
    });
  }, []);

 

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
