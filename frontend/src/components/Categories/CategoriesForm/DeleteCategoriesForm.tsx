import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { CategorySchemaOutput, ModalCategories, TableSetState } from 'types';
import axios from 'axios';
interface DeleteCategoriesFormProps {
  category: CategorySchemaOutput;
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  setUpdatedCategories: TableSetState<CategorySchemaOutput[]>;
}
export const DeleteCategoriesForm = ({
  category,
  setOpenModal,
  setModalCategory,
  setUpdatedCategories
}: DeleteCategoriesFormProps) => {
  const handleConfirmationClick = async () => {
    try {
      const {
        data: { category: deletedCategory }
      } = await axios.delete(`/api/categories/${category._id}`);
      setUpdatedCategories(categories => {
        const categoriesCopy: CategorySchemaOutput[] = JSON.parse(JSON.stringify(categories));
        const retrievedCategoryIndex = categoriesCopy.findIndex(
          ({ _id }) => _id === deletedCategory._id
        );

        if (retrievedCategoryIndex !== -1) categoriesCopy.splice(retrievedCategoryIndex, 1);

        return categoriesCopy;
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
      <DialogTitle id='alert-dialog-title'>{`Delete Category: - ${category.name}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete this category?
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
