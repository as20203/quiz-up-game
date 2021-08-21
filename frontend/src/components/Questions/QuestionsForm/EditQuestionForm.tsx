import { QuestionFormStyles, QuestionButton } from './elements';
import { InputFormGroup, OptionFormGroup } from 'components';
import { useForm } from 'customHooks';
import { UserSchemaOutput, ModalCategories, TableSetState } from 'types';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
interface EditCategoriesFormProps {
  retrievedUser: UserSchemaOutput;
  setOpenModal: TableSetState<boolean>;
  setUpdatedUsers: TableSetState<UserSchemaOutput[]>;
  setModalCategory: TableSetState<ModalCategories>;
}
export const EditUserForm = ({
  retrievedUser: { username, name, category, _id: retrievedUserId },
  setOpenModal,
  setUpdatedUsers,
  setModalCategory
}: EditCategoriesFormProps) => {
  const [user, handleUser, setUser] = useForm({
    username,
    password: '',
    name,
    category
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
        data: { user: updatedUser }
      }: { data: { user: UserSchemaOutput } } = await axios.patch(
        `/api/users/${retrievedUserId}`,
        user
      );
      setUpdatedUsers(users => {
        const categoriesCopy: UserSchemaOutput[] = JSON.parse(JSON.stringify(users));
        const retrievedCategoryIndex = categoriesCopy.findIndex(
          ({ _id }) => _id === updatedUser._id
        );
        if (retrievedCategoryIndex !== -1) categoriesCopy[retrievedCategoryIndex] = updatedUser;

        return categoriesCopy;
      });
      setUser({
        username: '',
        password: '',
        name: '',
        category: 'player'
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
      <Typography variant='h4'> {`Edit User`}</Typography>
      <InputFormGroup
        style={styles.input}
        label='Name:'
        value={user.name}
        required={true}
        onChange={event => {
          handleUser(event);
        }}
        type='text'
        name='name'
        id='name'
        placeholder='Enter your name'
      />
      <InputFormGroup
        style={styles.input}
        label='Username:'
        value={user.username}
        required={true}
        onChange={event => {
          handleUser(event);
        }}
        type='text'
        name='username'
        id='username'
        placeholder='Enter your username'
      />
      <InputFormGroup
        style={styles.input}
        label='Password:'
        value={user.password}
        required={true}
        onChange={event => {
          handleUser(event);
        }}
        type='password'
        name='password'
        id='password'
        placeholder='Enter your password'
      />
      <OptionFormGroup
        label='Sign up As'
        value={user.category}
        required={true}
        onChange={event => {
          handleUser(event);
        }}
        name='category'
        options={[
          { key: 'player', value: 'Player' },
          { key: 'contributor', value: 'Contributor' },
          { key: 'admin', value: 'Admin' }
        ]}
      />

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
