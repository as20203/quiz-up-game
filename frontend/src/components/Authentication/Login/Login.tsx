import { LoginMain, LoginForm, LoginButton } from './elements';
import { InputFormGroup } from 'components';
import { useForm } from 'customHooks';
import { FormEvent, useState } from 'react';
import { Typography } from '@material-ui/core';
export const Login = () => {
  const [login, handleLogin] = useForm({ username: '', password: '' });
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
    console.log(login);
    setDisable(false);
  };
  return (
    <LoginMain>
      <LoginForm onSubmit={handleSubmit}>
        <Typography variant='h3'> Login</Typography>
        <InputFormGroup
          style={styles.input}
          label='Username:'
          value={login.username}
          required={true}
          onChange={event => {
            handleLogin(event);
          }}
          type='text'
          name='username'
          id='username'
          placeholder='Enter your username'
        />
        <InputFormGroup
          style={styles.input}
          label='Password:'
          value={login.password}
          required={true}
          onChange={event => {
            handleLogin(event);
          }}
          type='password'
          name='password'
          id='password'
          placeholder='Enter your password'
        />
        <LoginButton
          textColor='white'
          variant='contained'
          disabled={disable}
          backgroundColor={'#007bff'}
          type='submit'
        >
          {disable ? 'Submitting' : 'Submit'}
        </LoginButton>
      </LoginForm>
    </LoginMain>
  );
};
