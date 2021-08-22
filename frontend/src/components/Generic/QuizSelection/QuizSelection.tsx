import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import { QuestionSchemaOutput, TableSetState } from 'types';
import { QuizButton } from './elements';

interface QuizSelectionProps {
  question: QuestionSchemaOutput;
  questions: QuestionSchemaOutput[];
  setScore: TableSetState<number>;
  setCurrentQuestion: TableSetState<QuestionSchemaOutput | null>;
}
export const QuizSelection = ({
  question: { text, choices, answer },
  questions,
  setCurrentQuestion,
  setScore
}: QuizSelectionProps) => {
  const [value, setValue] = React.useState(choices[0]);
  const [, setQuestionNumber] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{text}</FormLabel>
      <RadioGroup
        style={{ marginTop: '10px' }}
        aria-label='gender'
        name='gender1'
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value={choices[0] || ''} control={<Radio />} label={choices[0] || ''} />
        <FormControlLabel value={choices[1] || ''} control={<Radio />} label={choices[1] || ''} />
        <FormControlLabel value={choices[2] || ''} control={<Radio />} label={choices[2] || ''} />
        <FormControlLabel value={choices[3] || ''} control={<Radio />} label={choices[3] || ''} />
      </RadioGroup>
      <QuizButton
        onClick={() => {
          if (answer === value) setScore(score => score + 10);
          setQuestionNumber(questionNumber => {
            if (questionNumber < questions.length - 1) {
              const currentQuestionNumber = questionNumber + 1;
              setCurrentQuestion(questions[currentQuestionNumber]);
              return currentQuestionNumber;
            }
            setCurrentQuestion(questions[0]);
            return 0;
          });
        }}
        backgroundColor='#7f7f7f'
        textColor='white'
      >
        Next
      </QuizButton>
    </FormControl>
  );
};
