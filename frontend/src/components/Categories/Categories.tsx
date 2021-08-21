import { CategoriesMain } from './elements';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'components';
import { BodyRow, CategorySchemaOutput } from 'types';

export const CategoriesPage = () => {
  const [tableBodyRows, setTableBodyRow] = useState<BodyRow[]>([]);
  const getCategories = async () => {
    try {
      const {
        data: { categories }
      }: { data: { categories: CategorySchemaOutput[] } } = await axios.get('/api/categories');
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
    } catch {}
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <CategoriesMain>
      {tableBodyRows.length > 0 && (
        <Table
          tableHeadRows={[{ value: 'Name' }, { value: 'Actions' }]}
          tableBodyRows={tableBodyRows}
        />
      )}
    </CategoriesMain>
  );
};
