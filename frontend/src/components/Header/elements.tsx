import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Container, ContainerProps } from '@material-ui/core';
export const HeaderMain = withStyles({
  root: {
    width: '100%',
    position: 'fixed',
    maxWidth: 'none',
    background: '#7f7f7f',
    display: 'flex',
    padding: '10px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: '0',
    left: '0'
    // '@media (min-width: 1280px)': {
    //   maxWidth: 'none'
    //}
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));
interface HeaderItemProps {
  marginLeft?: string;
}
export const HeaderItem = withStyles<string, {}, HeaderItemProps>({
  root: {
    width: '80px',
    height: '25px',
    display: 'flex',
    justifyContent: 'center',
    color: 'black',
    alignItems: 'center',
    borderRadius: '5px',
    background: '#d3d3d3',
    '&:hover': {
      backgroundColor: '#C0C0C0'
    },
    marginLeft: ({ marginLeft }) => marginLeft || '0px'
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <div className={classes.root} {...other} />
));
