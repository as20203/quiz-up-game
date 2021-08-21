import { QuestionFormStyles, QuestionButton } from './elements';
import { InputFormGroup, OptionFormGroup } from 'components';
import { QuestionChoicesSelection } from '../QuestionChoiceSelection';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { TableSetState, ModalCategories, QuestionSchemaOutput } from 'types';
interface AddUserFormProps {
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  categories: { key: string; value: string }[];
  setUpdatedQuestions: TableSetState<QuestionSchemaOutput[]>;
}
export const AddQuestionsForm = ({
  setOpenModal,
  setModalCategory,
  categories,
  setUpdatedQuestions
}: AddUserFormProps) => {
  const [category, setCategory] = useState({ key: '', value: '' });
  const [text, setText] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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
      console.log(category);
      const question = {
        categoryId: category.key,
        choices,
        answer: choices[selectedIndex],
        text
      };
      const {
        data: { question: newQuestion }
      }: { data: { question: QuestionSchemaOutput } } = await axios.post(
        '/api/questions',
        question
      );
      setCategory({ key: '', value: '' });
      setChoices(['', '', '', '']);
      setText('');
      setModalCategory('');
      setUpdatedQuestions(questions => {
        const questionsCopy: QuestionSchemaOutput[] = JSON.parse(JSON.stringify(questions));
        questionsCopy.push(newQuestion);
        return questionsCopy;
      });
      setOpenModal(false);
      setDisable(false);
    } catch (error) {
      setDisable(false);
    }
  };
  return (
    <QuestionFormStyles onSubmit={handleSubmit}>
      <Typography variant='h4'> Add Question</Typography>
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
