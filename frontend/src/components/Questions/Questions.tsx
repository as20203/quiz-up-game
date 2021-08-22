import { QuestionsMain } from './elements';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SimpleModal, Table } from 'components';
import { AddQuestionsForm, DeleteQuestionForm, EditQuestionsForm } from './QuestionsForm';
import { Add } from '@material-ui/icons';
import { ModalCategories, BodyRow, QuestionSchemaOutput, CategorySchemaOutput } from 'types';
import { IconButton, Typography } from '@material-ui/core';
export const QuestionsPage = () => {
  const [tableBodyRows, setTableBodyRow] = useState<BodyRow[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState('');
  const [categories, setCategories] = useState<{ key: string; value: string }[]>([]);
  const [questions, setQuestions] = useState<QuestionSchemaOutput[]>([]);
  const [modalCategory, setModalCategory] = useState<ModalCategories>('');
  const getModalComponent = (category: ModalCategories) => {
    switch (category) {
      case 'add':
        return (
          <AddQuestionsForm
            categories={categories}
            setUpdatedQuestions={setQuestions}
            setModalCategory={setModalCategory}
            setOpenModal={setOpenModal}
          />
        );
      case 'edit':
        const retrievedEditRow = questions.find(({ _id }) => _id === selectedElementId);
        if (retrievedEditRow)
          return (
            <EditQuestionsForm
              categories={categories}
              setUpdatedQuestions={setQuestions}
              setModalCategory={setModalCategory}
              setOpenModal={setOpenModal}
              retrievedQuestion={retrievedEditRow}
            />
          );
        return undefined;
      case 'delete':
        const retrievedDeletedRow = questions.find(({ _id }) => _id === selectedElementId);
        if (retrievedDeletedRow)
          return (
            <DeleteQuestionForm
              setUpdatedQuestions={setQuestions}
              setModalCategory={setModalCategory}
              setOpenModal={setOpenModal}
              question={retrievedDeletedRow}
            />
          );
        return undefined;

      default:
        return undefined;
    }
  };

  const setQuestionTableRows = (questions: QuestionSchemaOutput[]) => {
    const tableBodyRows = questions.map(({ _id, category: { name }, text, answer }) => {
      return {
        _id,
        rowData: [
          {
            value: text
          },
          {
            value: name
          },
          { value: answer },
          {
            value: 'actions'
          }
        ]
      };
    });
    setTableBodyRow(tableBodyRows);
  };

  useEffect(() => {
    setQuestionTableRows(questions);
  }, [questions]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const {
          data: { questions }
        }: { data: { questions: QuestionSchemaOutput[] } } = await axios.get('/api/questions');

        setQuestions(questions);
        setQuestionTableRows(questions);
      } catch {}
    };
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
    getQuestions();
  }, []);
  return (
    <>
      <QuestionsMain>
        <Typography variant='h3'> Questions</Typography>

        <>
          <IconButton
            onClick={() => {
              setOpenModal(true);
              setModalCategory('add');
            }}
            style={{ alignSelf: 'flex-end' }}
          >
            <Add />
          </IconButton>
          <SimpleModal
            setOpenModal={setOpenModal}
            openModal={openModal}
            children={getModalComponent(modalCategory)}
          />
          <Table
            tableHeadRows={[
              { value: 'Text' },
              { value: 'Category' },
              { value: 'Answer' },
              { value: 'Questions' }
            ]}
            tableBodyRows={tableBodyRows}
            setOpenModal={setOpenModal}
            setModalCategory={setModalCategory}
            setSelectedElementId={setSelectedElementId}
          />
        </>
      </QuestionsMain>
    </>
  );
};
