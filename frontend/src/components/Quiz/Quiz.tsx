import {
  QuizMainPage,
  SelectCategoryMainPage,
  SelectCategoryHeader,
  QuizButton,
  QuizContainer
} from './elements';
import { useEffect, useState } from 'react';
import { OptionFormGroup, QuizSelection, Timer } from 'components';
import { CategorySchemaOutput, QuestionSchemaOutput } from 'types';
import axios from 'axios';
import { Fade, Typography } from '@material-ui/core';
export const QuizPage = () => {
  const [category, setCategory] = useState({ key: '', value: '' });
  const [categories, setCategories] = useState<{ key: string; value: string }[]>([]);
  const [categorySelectionFade, setCategorySelectionFade] = useState(false);
  const [quizInfoFade, setquizInfoFade] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionSchemaOutput | null>(null);
  const [questions, setQuestions] = useState<QuestionSchemaOutput[]>([]);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const {
          data: { categories }
        }: { data: { categories: CategorySchemaOutput[] } } = await axios.get('/api/categories');
        const newCategories = categories.map(({ _id, name }) => {
          return { key: _id, value: name };
        });
        setCategories(newCategories);
      } catch {}
    };
    getCategories();
  }, []);

  const getCategoryQuestions = async () => {
    try {
      setLoading(true);
      const {
        data: { questions }
      }: { data: { questions: QuestionSchemaOutput[] } } = await axios.get(
        `/api/questions?categoryId=${category.key}`
      );

      setQuestions(questions);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saveScore = async () => {
      try {
        await axios.post(`/api/quizzes`, {
          score,
          categoryId: category.key
        });
      } catch {}
    };
    if (gameEnded) saveScore();
  }, [gameEnded, category.key, score]);

  useEffect(() => {
    const fadeInCategorySelection = setTimeout(() => {
      setCategorySelectionFade(true);
    }, 500);
    return () => clearTimeout(fadeInCategorySelection);
  }, []);

  return (
    <QuizMainPage>
      <Fade in={categorySelectionFade}>
        <SelectCategoryMainPage showDisplay={categorySelectionFade}>
          <SelectCategoryHeader variant='h4'> Select Category</SelectCategoryHeader>
          <OptionFormGroup
            label=''
            value={category.key}
            required={true}
            onChange={event => {
              setCategory(category => {
                return { ...category, key: event.target.value } as { key: string; value: string };
              });
            }}
            name='category'
            options={categories}
          />
          {category.key && (
            <QuizButton
              onClick={() => {
                setCategorySelectionFade(false);
                getCategoryQuestions();
                setTimeout(() => {
                  setquizInfoFade(true);
                }, 500);
              }}
              backgroundColor='#7f7f7f'
              textColor='white'
            >
              Next
            </QuizButton>
          )}
        </SelectCategoryMainPage>
      </Fade>
      <Fade in={quizInfoFade}>
        <QuizContainer showDisplay={quizInfoFade}>
          <Typography variant='body1'>
            {' '}
            This is a one minute timed quiz. Each correct answer corresponds to 10 points. Answer
            the maximum questions to get the most score.
          </Typography>
          {questions.length > 0 && !loading && (
            <QuizButton
              onClick={() => {
                setCurrentQuestion(questions[0]);
                setquizInfoFade(false);
                setQuizQuestions(true);
              }}
              backgroundColor='#7f7f7f'
              textColor='white'
            >
              Start Quiz
            </QuizButton>
          )}
          {!loading && questions.length === 0 && (
            <>
              {' '}
              <Typography variant='body1'>
                {' '}
                No questions for this category. Try some other category
              </Typography>{' '}
              <QuizButton
                onClick={() => {
                  setCategorySelectionFade(true);
                  setquizInfoFade(false);
                }}
                backgroundColor='#7f7f7f'
                textColor='white'
              >
                Back To Categories
              </QuizButton>
            </>
          )}
        </QuizContainer>
      </Fade>
      <Fade in={quizQuestions}>
        <QuizContainer showDisplay={quizQuestions}>
          <Timer start={quizQuestions} setGameEnded={setGameEnded} setStart={setQuizQuestions} />
          <Typography variant='body1'>
            {currentQuestion && (
              <QuizSelection
                setCurrentQuestion={setCurrentQuestion}
                questions={questions}
                setScore={setScore}
                question={currentQuestion}
              />
            )}
          </Typography>
        </QuizContainer>
      </Fade>
      <Fade in={gameEnded}>
        <QuizContainer showDisplay={gameEnded}>
          <Typography variant='body1'>{`Game over. You have scored ${score} points. `}</Typography>
          <QuizButton
            onClick={() => {
              setScore(0);
              setCategorySelectionFade(true);
              setquizInfoFade(false);
              setGameEnded(false);
            }}
            backgroundColor='#7f7f7f'
            textColor='white'
          >
            Retry
          </QuizButton>
        </QuizContainer>
      </Fade>
    </QuizMainPage>
  );
};
