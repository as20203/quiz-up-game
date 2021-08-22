import { QuestionFormStyles, QuestionButton } from './elements';
import { InputFormGroup, OptionFormGroup } from 'components';
import { QuestionChoicesSelection } from '../QuestionChoiceSelection';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { TableSetState, ModalCategories, QuestionSchemaOutput } from 'types';
interface AddUserFormProps {
  retrievedQuestion: QuestionSchemaOutput;
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  categories: { key: string; value: string }[];
  setUpdatedQuestions: TableSetState<QuestionSchemaOutput[]>;
}
export const EditQuestionsForm = ({
  retrievedQuestion,
  setOpenModal,
  setModalCategory,
  categories,
  setUpdatedQuestions
}: AddUserFormProps) => {
  const [category, setCategory] = useState({
    key: retrievedQuestion.category._id,
    value: retrievedQuestion.category.name
  });
  const [text, setText] = useState(retrievedQuestion.text);
  const [choices, setChoices] = useState(retrievedQuestion.choices);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    choices.findIndex(choice => choice === retrievedQuestion.answer)
  );

  const styles = {
    input: {
      border: 'none',
      borderBottom: '1px solid #ced4da',
      boxShadow: 'none'
    }
  };
  const [disable, setDisable] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setDisable(true);
      const question = {
        categoryId: category.key,
        choices,
        answer: choices[selectedIndex],
        text
      };
      const {
        data: { question: updatedQuestion }
      }: { data: { question: QuestionSchemaOutput } } = await axios.patch(
        `/api/questions/${retrievedQuestion._id}`,
        question
      );
      setUpdatedQuestions(questions => {
        const questionsCopy: QuestionSchemaOutput[] = JSON.parse(JSON.stringify(questions));
        const retrievedQuestionIndex = questionsCopy.findIndex(
          ({ _id }) => _id === updatedQuestion._id
        );
        if (retrievedQuestionIndex !== -1) questionsCopy[retrievedQuestionIndex] = updatedQuestion;
        return questionsCopy;
      });
      setModalCategory('');
      setOpenModal(false);
      setDisable(false);
    } catch (error) {
      setDisable(false);
    }
  };
  return (
    <QuestionFormStyles onSubmit={handleSubmit}>
      <Typography variant='h4'> {`Edit Question ${retrievedQuestion._id}`}</Typography>
      <InputFormGroup
        style={styles.input}
        label='Text:'
        value={text}
        required={true}
        onChange={event => {
          setText(event.target.value);
        }}
        type='text'
        name='text'
        id='text'
        placeholder='Enter your text'
      />
      <QuestionChoicesSelection
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        setChoices={setChoices}
        choices={choices}
      />
      {categories.length > 0 && (
        <OptionFormGroup
          label='Category'
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
      )}
      <QuestionButton
        textColor='white'
        variant='contained'
        disabled={disable}
        backgroundColor={'#007bff'}
        type='submit'
      >
        {disable ? 'Submitting' : 'Submit'}
      </QuestionButton>
    </QuestionFormStyles>
  );
};
