import { HeaderMain, HeaderItem } from './elements';
export const Header = () => {
  return (
    <HeaderMain>
      <HeaderItem padding={10} to='/' marginLeft='5px'>
        {' '}
        Home{' '}
      </HeaderItem>
      <HeaderItem marginLeft='auto' padding={10} to='/login'>
        {' '}
        Login{' '}
      </HeaderItem>
      <HeaderItem padding={10} to='signup' marginLeft='5px'>
        {' '}
        Signup{' '}
      </HeaderItem>
    </HeaderMain>
  );
};
