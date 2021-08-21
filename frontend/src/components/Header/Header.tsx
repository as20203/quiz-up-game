import { useContext } from 'react';
import { authContext } from 'services';
import { HeaderMain, HeaderItem } from './elements';
import history from 'MyHistory';
export const Header = () => {
  const [{ user }, dispatch] = useContext(authContext);
  const logout = () => {
    dispatch({ type: 'notauthenticated', user: null, value: false });
    localStorage.clear();
    history.push('/');
  };

  return (
    <HeaderMain>
      <HeaderItem padding={10} to='/' marginLeft='5px'>
        {' '}
        Home{' '}
      </HeaderItem>
      {!user && (
        <>
          <HeaderItem marginLeft='auto' padding={10} to='/login'>
            {' '}
            Login{' '}
          </HeaderItem>
          <HeaderItem padding={10} to='signup' marginLeft='5px'>
            {' '}
            Signup{' '}
          </HeaderItem>{' '}
        </>
      )}
      {user && user.category === 'admin' && (
        <HeaderItem padding={10} to='/users'>
          {' '}
          Users{' '}
        </HeaderItem>
      )}
      {user && user.category === 'admin' && (
        <HeaderItem padding={10} to='/categories'>
          {' '}
          Categories{' '}
        </HeaderItem>
      )}

      {user && (
        <HeaderItem onClick={() => logout()} marginLeft='auto' padding={10} to='#'>
          {' '}
          Logout{' '}
        </HeaderItem>
      )}
    </HeaderMain>
  );
};
