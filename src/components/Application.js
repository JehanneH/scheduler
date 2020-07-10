import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState ({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        // console.log(response);
        setState({
          ...state,
          appointments
        });
      });
  }
 
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        // console.log(response);
        setState({
          ...state,
          appointments
        });
      });
  }

  const schedule = appointments.map((appointment, index) => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
      )
  })

  
  
 useEffect(() => {
  const daysPromise = axios.get(`/api/days`)
  const appointmentsPromise = axios.get(`/api/appointments`)
  const interviewersPromise = axios.get(`/api/interviewers`)

  Promise.all([daysPromise, appointmentsPromise, interviewersPromise]).then((all) => {

    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))

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
        <Appointment 
          key="last" 
          time="5pm"/>
      </section>
    </main>
  );
}
