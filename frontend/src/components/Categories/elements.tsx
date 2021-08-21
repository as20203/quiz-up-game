import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Container, ContainerProps } from '@material-ui/core';
export const CategoriesMain = withStyles({
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
