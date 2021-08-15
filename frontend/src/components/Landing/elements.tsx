import { WithStyles, withStyles } from '@material-ui/core/styles';
import {
  Container,
  ContainerProps,
  Typography,
  TypographyProps,
  Button,
  ButtonProps
} from '@material-ui/core';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
export const QuizMain = withStyles({
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
    '@media (min-width: 1280px)': {
      maxWidth: 'none'
    }
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));

export const QuizContent = withStyles({
  root: {
    display: 'flex',
    padding: '25px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#bdd4e7',
    backgroundImage: 'linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%)',
    height: '400px',
    width: '80%',
    margin: '0 auto',
    color: '#383838	'
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));

export const QuizContentHeader = withStyles({
  root: {
    display: 'flex',
    paddingTop: '15px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto'
  }
})(({ classes, ...other }: WithStyles & TypographyProps) => (
  <Typography className={classes.root} {...other} />
));

export const QuizContentDescription = withStyles({
  root: {
    display: 'flex',
    textAlign: 'center',
    paddingTop: '15px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto'
  }
})(
  ({
    classes,
    ...other
  }: WithStyles &
    DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
    <p className={classes.root} {...other} />
  )
);

interface QuizGetStartedButtonProps {
  backgroundColor?: string;
  textColor?: string;
  marginTop?: number;
}
export const QuizGetStartedButton = withStyles<string, {}, QuizGetStartedButtonProps>({
  root: {
    marginTop: ({ marginTop }) => `${marginTop}px` || '0px',
    display: 'block',
    margin: '5px auto',
    background: ({ backgroundColor }) => backgroundColor || 'green',
    color: ({ textColor }) => textColor || 'red',
    '&:hover': {
      backgroundColor: ({ backgroundColor }) => backgroundColor || 'green'
    }
  }
})(({ classes, ...other }: WithStyles & ButtonProps) => (
  <Button className={classes.root} {...other} />
));
