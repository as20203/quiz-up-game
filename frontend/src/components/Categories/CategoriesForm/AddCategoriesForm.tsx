import { CategoriesFormStyles, CategoriesButton } from './elements';
import { InputFormGroup } from 'components';
import { useForm } from 'customHooks';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { TableSetState, ModalCategories, CategorySchemaOutput } from 'types';
interface AddCategoriesFormProps {
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  setUpdatedCategories: TableSetState<CategorySchemaOutput[]>;
}
export const AddCategoriesForm = ({
  setOpenModal,
  setModalCategory,
  setUpdatedCategories
}: AddCategoriesFormProps) => {
  const [categories, handleCategories, setCategories] = useForm({
    name: ''
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
        data: { category: newCategory }
      }: { data: { category: CategorySchemaOutput } } = await axios.post(
        '/api/categories',
        categories
      );
      setCategories({ name: '' });
      setModalCategory('');
      setUpdatedCategories(categories => {
        const categoriesCopy: CategorySchemaOutput[] = JSON.parse(JSON.stringify(categories));
        categoriesCopy.push(newCategory);
        return categoriesCopy;
      });
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
