import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { UserSchemaOutput, ModalCategories, TableSetState } from 'types';
import axios from 'axios';
interface DeleteCategoriesFormProps {
  user: UserSchemaOutput;
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  setUpdatedUsers: TableSetState<UserSchemaOutput[]>;
}
export const DeleteUserForm = ({
  user,
  setOpenModal,
  setModalCategory,
  setUpdatedUsers
}: DeleteCategoriesFormProps) => {
  const handleConfirmationClick = async () => {
    try {
      const {
        data: { user: deletedUser }
      } = await axios.delete(`/api/users/${user._id}`);
      setUpdatedUsers(users => {
        const usersCopy: UserSchemaOutput[] = JSON.parse(JSON.stringify(users));
        const retrievedUserIndex = usersCopy.findIndex(({ _id }) => _id === deletedUser._id);

        if (retrievedUserIndex !== -1) usersCopy.splice(retrievedUserIndex, 1);

        return usersCopy;
      });
      setOpenModal(false);
      setModalCategory('');
    } catch {}
  };
  const handleNonConfirmationClick = () => {
    setOpenModal(false);
    setModalCategory('');
  };
  return (
    <>
      <DialogTitle id='alert-dialog-title'>{`Delete User: - ${user.name}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleNonConfirmationClick()} color='primary'>
          No
        </Button>
        <Button onClick={() => handleConfirmationClick()} style={{ color: 'red' }} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </>
  );
};
