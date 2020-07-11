import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory([...newHistory, newMode]);
    } else {
      // setHistory([...history, newMode])
      setHistory(prev => [...prev, newMode])
    }
    setMode(newMode)
  }


  const back = () => {
    setHistory(history.slice(0, history.length - 1));
    setMode(history.slice(history.length - 2)[0]);
    }
  return { mode, transition, back }
}
  
  


//   const transition = (newMode, replace = false) => {
//     if (replace) {
//       const newHist = history.slice(0, history.length - 1);
//       setHistory([...newHist, newMode]);
//     } else {
//       setHistory([...history, newMode]);
//     }
//     setMode(newMode);
//   };
//   const back = () => {
//     const newHist = history.slice(0, history.length - 1);
//     const prevMode = history.slice(history.length - 2)[0]; // prevMode is the second last element of the history state (because the last history element is the current mode). Slice will wrap around indexes less than 0 so prevMode will always contain at least one element.
//     setHistory(newHist);
//     setMode(prevMode);
//   };
//   return { mode, transition, back };
// }