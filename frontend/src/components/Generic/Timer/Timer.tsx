import { useEffect, useState } from 'react';
import { TableSetState } from 'types';

interface TimerProps {
  start: boolean;
  setStart: TableSetState<boolean>;
  setGameEnded: TableSetState<boolean>;
}
export const Timer = ({ start, setStart, setGameEnded }: TimerProps) => {
  const [counter, setCounter] = useState(10);
  const resetCounter = () => setCounter(10);
  useEffect(() => {
    if (start) {
      const timeout = setTimeout(() => {
        setCounter(counter => {
          if (counter === 0) {
            setStart(false);
            setGameEnded(true);
            resetCounter();
            clearTimeout(timeout);
            return counter;
          }
          return counter - 1;
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [counter, start, setStart, setGameEnded]);
  return <>{`00:00:${counter < 10 ? `0${counter}` : counter}`}</>;
};
