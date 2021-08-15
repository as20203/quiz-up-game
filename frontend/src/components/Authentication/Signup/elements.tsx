import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Container, ContainerProps, Button, ButtonProps } from '@material-ui/core';
import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
export const SignupMain = withStyles({
  root: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#E8E8E8',
    fontFamily: 'Roboto',
    maxWidth: 'none'
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));

export const SignupForm = withStyles({
  root: {
    width: '400px',
    height: '450px',
    maxHeight: '100%',
    margin: '0',
    display: 'flex',
    padding: '25px',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    background: '#FDFBF2',
    fontFamily: 'Roboto',
    maxWidth: 'none'
  }
})(
  ({
    classes,
    ...other
  }: WithStyles & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => (
    <form className={classes.root} {...other} />
  )
);

interface SignupButtonProps {
  backgroundColor?: string;
  textColor?: string;
}
export const SignupButton = withStyles<string, {}, SignupButtonProps>({
  root: {
    display: 'block',
    margin: '15px auto',
    background: ({ backgroundColor }) => backgroundColor || 'green',
    color: ({ textColor }) => textColor || 'red',
    '&:hover': {
      backgroundColor: ({ backgroundColor }) => backgroundColor || 'green'
    }
  }
})(({ classes, ...other }: WithStyles & ButtonProps) => (
  <Button className={classes.root} {...other} />
));
