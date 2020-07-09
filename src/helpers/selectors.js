export default function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((specificDay) => {
    return specificDay.name === day
  })
  if (filteredDays.length === 0) {
    return [];
  }

  const mappedAppointments = filteredDays[0].appointments.map((appointment) => {
    return state.appointments[appointment]
  })
  return mappedAppointments;
}

