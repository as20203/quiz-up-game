import {
  QuizMain,
  QuizContent,
  QuizContentHeader,
  QuizContentDescription,
  QuizGetStartedButton
} from './elements';
export const Landing = () => {
  return (
    <QuizMain>
      <QuizContent>
        <QuizContentHeader color='primary' variant='h3'>
          {' '}
          Quiz-Up Challenge{' '}
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
    </QuizMain>
  );
};
