import { CategoriesMain } from './elements';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, SimpleModal } from 'components';
import { BodyRow, CategorySchemaOutput } from 'types';
import { AddCategoriesForm, EditCategoriesForm, DeleteCategoriesForm } from './CategoriesForm';
import { Add } from '@material-ui/icons';
import { ModalCategories } from 'types';
import { IconButton, Typography } from '@material-ui/core';
export const CategoriesPage = () => {
  const [tableBodyRows, setTableBodyRow] = useState<BodyRow[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState<CategorySchemaOutput[]>([]);
  const [selectedElementId, setSelectedElementId] = useState('');
  const [modalCategory, setModalCategory] = useState<ModalCategories>('');
  const getModalComponent = (category: ModalCategories) => {
    switch (category) {
      case 'add':
        return (
          <AddCategoriesForm
            setUpdatedCategories={setCategories}
            setModalCategory={setModalCategory}
            setOpenModal={setOpenModal}
          />
        );
      case 'edit':
        const retrievedEditRow = categories.find(({ _id }) => _id === selectedElementId);
        if (retrievedEditRow)
          return (
            <EditCategoriesForm
              setUpdatedCategories={setCategories}
              setModalCategory={setModalCategory}
              setOpenModal={setOpenModal}
              category={retrievedEditRow}
            />
          );
        return undefined;
      case 'delete':
        const retrievedDeletedRow = categories.find(({ _id }) => _id === selectedElementId);
        if (retrievedDeletedRow)
          return (
            <DeleteCategoriesForm
              setUpdatedCategories={setCategories}
              setModalCategory={setModalCategory}
              setOpenModal={setOpenModal}
              category={retrievedDeletedRow}
            />
          );
        return undefined;

      default:
        return undefined;
    }
  };

  const setCategoryTableRows = (categories: CategorySchemaOutput[]) => {
    const tableBodyRows = categories.map(({ name, _id }) => {
      return {
        _id,
        rowData: [
          {
            value: name
          },
          {
            value: 'actions'
          }
        ]
      };
    });
    setTableBodyRow(tableBodyRows);
  };

  useEffect(() => {
    setCategoryTableRows(categories);
  }, [categories]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const {
          data: { categories }
        }: { data: { categories: CategorySchemaOutput[] } } = await axios.get('/api/categories');

        setCategories(categories);
        setCategoryTableRows(categories);
      } catch {}
    };

    getCategories();
  }, []);
  return (
    <>
      {tableBodyRows.length > 0 && (
        <CategoriesMain>
          <Typography variant='h3'> Categories</Typography>
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
                tableHeadRows={[{ value: 'Name' }, { value: 'Actions' }]}
                tableBodyRows={tableBodyRows}
                setOpenModal={setOpenModal}
                setModalCategory={setModalCategory}
                setSelectedElementId={setSelectedElementId}
              />
            </>
          )}
        </CategoriesMain>
      )}
    </>
  );
};
