import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState ({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  function updateSpots() {
    axios.get("/api/days")
    .then((response) => {
        setState(prev => {
          return ({ ...prev, days: response.data })})
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  };


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments
        })
        updateSpots()
      })
        .catch((error) => {
          return Promise.reject(error);
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments
      })
      updateSpots()
    })
      .catch((error) => {
        return Promise.reject(error);
      })
  }

  useEffect(() => {
    const daysPromise = axios.get(`/api/days`)
    const appointmentsPromise = axios.get(`/api/appointments`)
    const interviewersPromise = axios.get(`/api/interviewers`)
  
    Promise.all([daysPromise, appointmentsPromise, interviewersPromise]).then((all) => {
      
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      
    }, []);

  return {state, setDay, bookInterview, cancelInterview}
}