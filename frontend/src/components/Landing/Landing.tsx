import { useEffect, useState } from 'react';
import { Fade } from '@material-ui/core';
import {
  QuizMain,
  QuizContent,
  QuizContentHeader,
  QuizContentDescription,
  QuizGetStartedButton
} from './elements';
export const Landing = () => {
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const timout = setTimeout(() => setFade(true), 500);
    return () => clearTimeout(timout);
  }, [fade]);
  return (
    <QuizMain>
      <Fade in={fade}>
        <QuizContent>
          <QuizContentHeader color='primary' variant='h3'>
            {' '}
            Quiz-Up{' '}
          </QuizContentHeader>
          <QuizContentDescription>
            The Ultimate Quiz Challenges to Test you skills.
            <br />
            Select a quiz from a wide range of categories.
          </QuizContentDescription>
          <QuizGetStartedButton marginTop={70} backgroundColor='#0073cf' textColor='white'>
            {' '}
            Get Started{' '}
          </QuizGetStartedButton>
        </QuizContent>
      </Fade>
    </QuizMain>
  );
};
