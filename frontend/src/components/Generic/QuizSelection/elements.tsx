import { withStyles, WithStyles, ButtonProps, Button } from '@material-ui/core';

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
