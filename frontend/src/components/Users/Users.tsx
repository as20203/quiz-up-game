import { UsersMain } from './elements';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, SimpleModal } from 'components';
import { AddUserForm, EditUserForm, DeleteUserForm } from './UsersForm';
import { Add } from '@material-ui/icons';
import { ModalCategories, UserSchemaOutput, BodyRow } from 'types';
import { IconButton, Typography } from '@material-ui/core';
export const UsersPage = () => {
  const [tableBodyRows, setTableBodyRow] = useState<BodyRow[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState<UserSchemaOutput[]>([]);
  const [selectedElementId, setSelectedElementId] = useState('');
  const [modalCategory, setModalCategory] = useState<ModalCategories>('');
  const getModalComponent = (category: ModalCategories) => {
    switch (category) {
      case 'add':
        return (
          <AddUserForm
            setUpdatedUsers={setUsers}
            setModalCategory={setModalCategory}
            setOpenModal={setOpenModal}
          />
        );
      case 'edit':
        const retrievedEditRow = users.find(({ _id }) => _id === selectedElementId);
        if (retrievedEditRow)
          return (
            <EditUserForm
              setUpdatedUsers={setUsers}
              setModalCategory={setModalCategory}
              setOpenModal={setOpenModal}
              retrievedUser={retrievedEditRow}
            />
          );
        return undefined;
      case 'delete':
        const retrievedDeletedRow = users.find(({ _id }) => _id === selectedElementId);
        if (retrievedDeletedRow)
          return (
            <DeleteUserForm
              setUpdatedUsers={setUsers}
              setModalCategory={setModalCategory}
              setOpenModal={setOpenModal}
              user={retrievedDeletedRow}
            />
          );
        return undefined;

      default:
        return undefined;
    }
  };

  const setUserTableRows = (users: UserSchemaOutput[]) => {
    const tableBodyRows = users.map(({ name, _id, category, username }) => {
      return {
        _id,
        rowData: [
          {
            value: name
          },
          {
            value: username
          },
          { value: category },
          {
            value: 'actions'
          }
        ]
      };
    });
    setTableBodyRow(tableBodyRows);
  };

  useEffect(() => {
    setUserTableRows(users);
  }, [users]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const {
          data: { users }
        }: { data: { users: UserSchemaOutput[] } } = await axios.get('/api/users');

        setUsers(users);
        setUserTableRows(users);
      } catch {}
    };

    getUsers();
  }, []);
  return (
    <>
      {tableBodyRows.length > 0 && (
        <UsersMain>
          <Typography variant='h3'> Users</Typography>
          {tableBodyRows.length > 0 && (
            <>
              <IconButton
                onClick={() => {
                  setOpenModal(true);
                  setModalCategory('add');
                }}
                style={{ alignSelf: 'flex-end' }}
              >
                <Add />
              </IconButton>
              <SimpleModal
                setOpenModal={setOpenModal}
                openModal={openModal}
                children={getModalComponent(modalCategory)}
              />
              <Table
                tableHeadRows={[
                  { value: 'Name' },
                  { value: 'Username' },
                  { value: 'Category' },
                  { value: 'Actions' }
                ]}
                tableBodyRows={tableBodyRows}
                setOpenModal={setOpenModal}
                setModalCategory={setModalCategory}
                setSelectedElementId={setSelectedElementId}
              />
            </>
          )}
        </UsersMain>
      )}
    </>
  );
};
