import { CategoriesFormStyles, CategoriesButton } from './elements';
import { InputFormGroup, OptionFormGroup } from 'components';
import { useForm } from 'customHooks';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { TableSetState, ModalCategories, UserSchemaOutput } from 'types';
interface AddUserFormProps {
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  setUpdatedUsers: TableSetState<UserSchemaOutput[]>;
}
export const AddUserForm = ({
  setOpenModal,
  setModalCategory,
  setUpdatedUsers
}: AddUserFormProps) => {
  const [user, handleUser, setUser] = useForm({
    username: '',
    password: '',
    name: '',
    category: 'player'
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
        data: { user: newUser }
      }: { data: { user: UserSchemaOutput } } = await axios.post('/api/users', user);
      setUser({
        username: '',
        password: '',
        name: '',
        category: 'player'
      });
      setModalCategory('');
      setUpdatedUsers(users => {
        const usersCopy: UserSchemaOutput[] = JSON.parse(JSON.stringify(users));
        usersCopy.push(newUser);
        return usersCopy;
      });
      setOpenModal(false);
      setDisable(false);
    } catch (error) {
      setDisable(false);
    }
  };
  return (
    <CategoriesFormStyles onSubmit={handleSubmit}>
      <Typography variant='h4'> Add User</Typography>
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
