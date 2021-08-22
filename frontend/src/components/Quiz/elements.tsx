import { WithStyles, withStyles } from '@material-ui/core/styles';
import {
  Button,
  ButtonProps,
  Container,
  ContainerProps,
  Typography,
  TypographyProps
} from '@material-ui/core';
export const QuizMainPage = withStyles({
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

interface SelectCategoryMainPageProps {
  showDisplay?: boolean;
}
export const SelectCategoryMainPage = withStyles<string, {}, SelectCategoryMainPageProps>({
  root: {
    display: ({ showDisplay }) => (showDisplay ? 'flex' : 'none'),
    height: '500px',
    background: '#F9FBFF',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '400px'
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));

export const SelectCategoryHeader = withStyles({
  root: {
    padding: '25px'
  }
})(({ classes, ...other }: WithStyles & TypographyProps) => (
  <Typography className={classes.root} {...other} />
));
interface QuizButtonProps {
  backgroundColor?: string;
  textColor?: string;
}
export const QuizButton = withStyles<string, {}, QuizButtonProps>({
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
interface QuizContainerProps {
  showDisplay?: boolean;
}
export const QuizContainer = withStyles<string, {}, QuizContainerProps>({
  root: {
    height: '500px',
    display: ({ showDisplay }) => (showDisplay ? 'flex' : 'none'),
    background: '#F9FBFF',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '400px'
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));
