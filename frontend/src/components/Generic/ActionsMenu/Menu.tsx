import { useState, MouseEvent } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { ActionsIcon } from './elements';
import { TableSetState, ModalCategories } from 'types';

interface ActionMenuProps {
  id: string;
  setOpenModal: TableSetState<boolean>;
  setModalCategory: TableSetState<ModalCategories>;
  setSelectedElementId: TableSetState<string>;
}
export const ActionsMenu = ({
  id,
  setSelectedElementId,
  setOpenModal,
  setModalCategory
}: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (modelCategory: ModalCategories) => {
    setAnchorEl(null);
    setOpenModal(true);
    setSelectedElementId(id);
    setModalCategory(modelCategory);
  };

  return (
    <>
      <ActionsIcon aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} />
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose('edit')}>Edit</MenuItem>
        <MenuItem onClick={() => handleClose('delete')}>Delete</MenuItem>
      </Menu>
    </>
  );
};
