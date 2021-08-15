import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Container, ContainerProps } from '@material-ui/core';
import { Link, LinkProps } from 'react-router-dom';
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
  }
})(({ classes, ...other }: WithStyles & ContainerProps) => (
  <Container className={classes.root} {...other} />
));
interface HeaderItemProps {
  marginLeft?: string;
}
interface HeaderItemProps {
  padding?: number;
  display?: 'flex' | 'grid';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  hoverBackground?: string;
  fontSize?: number;
  height?: number;
  active?: boolean;
  activeBackground?: string;
  marginLeft?: string;
}
export const HeaderItem = withStyles<string, {}, HeaderItemProps>({
  root: {
    marginLeft: ({ marginLeft }) => marginLeft || 'none',
    height: ({ height }) => (height ? `${height}px` : 'auto'),
    fontSize: ({ fontSize }) => (fontSize ? `${fontSize}px` : '16px'),
    display: ({ display }) => display || 'initial',
    padding: ({ padding }) => (padding ? `${padding}px` : 'none'),
    justifyContent: ({ justifyContent }) => justifyContent || 'flex-start',
    background: ({ active, activeBackground }) =>
      active && activeBackground ? activeBackground : 'initial',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
      textDecoration: 'none',
      background: ({ hoverBackground, active, activeBackground }) =>
        active && activeBackground ? activeBackground : hoverBackground || '#4d4b50'
    }
  }
})(({ classes, ...other }: WithStyles & LinkProps & React.RefAttributes<HTMLAnchorElement>) => (
  <Link className={classes.root} {...other} />
));
