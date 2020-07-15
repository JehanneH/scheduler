import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory([...newHistory, newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  };


  const back = () => {
    setHistory(history.slice(0, history.length - 1));
    setMode(history.slice(history.length - 2)[0]);
  };
  
  return { mode, transition, back };
};