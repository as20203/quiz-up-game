import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { ModalCategories, TableSetState, QuestionSchemaOutput } from 'types';
import axios from 'axios';
interface DeleteCategoriesFormProps {
  question: QuestionSchemaOutput;
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  setUpdatedQuestions: TableSetState<QuestionSchemaOutput[]>;
}
export const DeleteQuestionForm = ({
  question,
  setOpenModal,
  setModalCategory,
  setUpdatedQuestions
}: DeleteCategoriesFormProps) => {
  const handleConfirmationClick = async () => {
    try {
      const {
        data: { question: deletedQuestion }
      }: { data: { question: QuestionSchemaOutput } } = await axios.delete(
        `/api/questions/${question._id}`
      );
      setUpdatedQuestions(questions => {
        const questionsCopy: QuestionSchemaOutput[] = JSON.parse(JSON.stringify(questions));
        const retrievedQuestionIndex = questionsCopy.findIndex(
          ({ _id }) => _id === deletedQuestion._id
        );

        if (retrievedQuestionIndex !== -1) questionsCopy.splice(retrievedQuestionIndex, 1);

        return questionsCopy;
      });
      setOpenModal(false);
      setModalCategory('');
    } catch {}
  };
  const handleNonConfirmationClick = () => {
    setOpenModal(false);
    setModalCategory('');
  };
  return (
    <>
      <DialogTitle id='alert-dialog-title'>{`Delete Question: - ${question._id}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete this question?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleNonConfirmationClick()} color='primary'>
          No
        </Button>
        <Button onClick={() => handleConfirmationClick()} style={{ color: 'red' }} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </>
  );
};
