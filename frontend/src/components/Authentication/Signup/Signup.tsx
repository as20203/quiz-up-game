import { SignupMain, SignupForm, SignupButton } from './elements';
import { InputFormGroup, OptionFormGroup } from 'components';
import { useForm } from 'customHooks';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
export const Signup = () => {
  const [signup, handleSignup] = useForm({
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisable(true);
    console.log(signup);
    setDisable(false);
  };
  return (
    <SignupMain>
      <SignupForm onSubmit={handleSubmit}>
        <Typography variant='h3'> Signup</Typography>
        <InputFormGroup
          style={styles.input}
          label='Name:'
          value={signup.name}
          required={true}
          onChange={event => {
            handleSignup(event);
          }}
          type='text'
          name='name'
          id='name'
          placeholder='Enter your name'
        />
        <InputFormGroup
          style={styles.input}
          label='Username:'
          value={signup.username}
          required={true}
          onChange={event => {
            handleSignup(event);
          }}
          type='text'
          name='username'
          id='username'
          placeholder='Enter your username'
        />
        <InputFormGroup
          style={styles.input}
          label='Password:'
          value={signup.password}
          required={true}
          onChange={event => {
            handleSignup(event);
          }}
          type='password'
          name='password'
          id='password'
          placeholder='Enter your password'
        />
        <OptionFormGroup
          label='Sign up As'
          value={signup.category}
          required={true}
          onChange={event => {
            handleSignup(event);
          }}
          name='category'
          options={[
            { key: 'player', value: 'Player' },
            { key: 'contributor', value: 'Contributor' }
          ]}
        />
        <SignupButton
          textColor='white'
          variant='contained'
          disabled={disable}
          backgroundColor={'#007bff'}
          type='submit'
        >
          {disable ? 'Submitting' : 'Submit'}
        </SignupButton>
      </SignupForm>
    </SignupMain>
  );
};
