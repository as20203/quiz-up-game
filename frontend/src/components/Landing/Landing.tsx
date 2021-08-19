import { useContext, useEffect, useState } from 'react';
import { Fade } from '@material-ui/core';
import {
  QuizMain,
  QuizContent,
  QuizContentHeader,
  QuizContentDescription,
  QuizGetStartedButton
} from './elements';
import { authContext } from 'services';
import history from 'MyHistory';

const Landing = () => {
  const [authentication] = useContext(authContext);
  const onClick = () => {
    const { user } = authentication;
    if (user && user.category === 'admin') history.push('/categories');
    else if (user && user.category === 'admin') history.push('/signup');
    else history.push('/');
  };
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
          <QuizGetStartedButton
            onClick={() => onClick()}
            marginTop={70}
            backgroundColor='#0073cf'
            textColor='white'
          >
            {' '}
            Get Started{' '}
          </QuizGetStartedButton>
        </QuizContent>
      </Fade>
    </QuizMain>
  );
};

export { Landing };
