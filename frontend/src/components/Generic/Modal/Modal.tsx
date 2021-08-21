import { makeStyles, Theme, createStyles, Modal } from '@material-ui/core';
import { TableSetState } from 'types';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 'auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);
interface SimpleModalProps {
  openModal: boolean;
  setOpenModal: TableSetState<boolean>;
  children?: JSX.Element;
}
export const SimpleModal = ({ children, openModal, setOpenModal }: SimpleModalProps) => {
  const classes = useStyles();
  const modalStyle = getModalStyle();

  const handleClose = () => {
    setOpenModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {children}
    </div>
  );

  return (
    <div>
      <Modal open={openModal} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};
