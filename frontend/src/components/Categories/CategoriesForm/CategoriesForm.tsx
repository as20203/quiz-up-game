import { CategoriesFormStyles, CategoriesButton } from './elements';

import { InputFormGroup } from 'components';
import { useForm } from 'customHooks';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
export const CategoriesForm = () => {
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
      await axios.post('/api/categories', categories);
      setCategories({ name: '' });
      setDisable(false);
    } catch (error) {}
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
