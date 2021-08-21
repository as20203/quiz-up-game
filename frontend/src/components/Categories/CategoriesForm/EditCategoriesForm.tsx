import { CategoriesFormStyles, CategoriesButton } from './elements';
import { InputFormGroup } from 'components';
import { useForm } from 'customHooks';
import { CategorySchemaOutput, ModalCategories, TableSetState } from 'types';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
interface EditCategoriesFormProps {
  category: CategorySchemaOutput;
  setOpenModal: TableSetState<boolean>;
  setUpdatedCategories: TableSetState<CategorySchemaOutput[]>;
  setModalCategory: TableSetState<ModalCategories>;
}
export const EditCategoriesForm = ({
  category,
  setOpenModal,
  setUpdatedCategories,
  setModalCategory
}: EditCategoriesFormProps) => {
  const [categories, handleCategories, setCategories] = useForm({
    name: category.name
  });

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
      const {
        data: { category: updatedCategory }
      }: { data: { category: CategorySchemaOutput } } = await axios.patch(
        `/api/categories/${category._id}`,
        categories
      );
      setUpdatedCategories(categories => {
        const categoriesCopy: CategorySchemaOutput[] = JSON.parse(JSON.stringify(categories));
        const retrievedCategoryIndex = categoriesCopy.findIndex(({ _id }) => _id === category._id);
        if (retrievedCategoryIndex !== -1) categoriesCopy[retrievedCategoryIndex] = updatedCategory;

        return categoriesCopy;
      });
      setCategories({ name: '' });
      setModalCategory('');
      setOpenModal(false);
      setDisable(false);
    } catch (error) {
      setDisable(false);
    }
  };
  return (
    <CategoriesFormStyles onSubmit={handleSubmit}>
      <Typography variant='h3'> Add Category</Typography>
      <InputFormGroup
        style={styles.input}
        label='Name:'
        value={categories.name}
        required={true}
        onChange={event => {
          handleCategories(event);
        }}
        type='text'
        name='name'
        id='name'
        placeholder='Enter your name'
      />

      <CategoriesButton
        textColor='white'
        variant='contained'
        disabled={disable}
        backgroundColor={'#007bff'}
        type='submit'
      >
        {disable ? 'Submitting' : 'Submit'}
      </CategoriesButton>
    </CategoriesFormStyles>
  );
};
