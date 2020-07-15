export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((specificDay) => {
    return specificDay.name === day;
  });
  if (filteredDays.length === 0) {
    return [];
  };

  const mappedAppointments = filteredDays[0].appointments.map((appointment) => {
    return state.appointments[appointment];
  });
  return mappedAppointments;
}



export function getInterview(state, interview) {
  if (!interview)
    return null;

  const newObject = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
 
  return newObject;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((specificDay) => {
    return specificDay.name === day;
  })
  if (filteredDays.length === 0) {
    return [];
  }

  const mappedInterviewers = filteredDays[0].interviewers.map((interviewer) => {
    return state.interviewers[interviewer];
  })
  return mappedInterviewers;
}
 