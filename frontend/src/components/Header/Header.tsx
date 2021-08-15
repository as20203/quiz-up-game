import { HeaderMain, HeaderItem } from './elements';
export const Header = () => {
  return (
    <HeaderMain>
      <HeaderItem marginLeft='5px'> Home </HeaderItem>
      <HeaderItem marginLeft='auto'> Login </HeaderItem>
      <HeaderItem marginLeft='5px'> Signup </HeaderItem>
    </HeaderMain>
  );
};
