import { WithStyles, withStyles } from '@material-ui/core/styles';
import { MoreHoriz } from '@material-ui/icons';
export const ActionsIcon = withStyles({
  root: {
    cursor: 'pointer'
  }
})(
  ({
    classes,
    children,
    ...other
  }: WithStyles &
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) => (
    <span className={classes.root} {...other}>
      {<MoreHoriz />}
    </span>
  )
);
