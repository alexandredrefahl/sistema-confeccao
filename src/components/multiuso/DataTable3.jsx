// import React from 'react';
import 'tabulator-tables/dist/css/tabulator.min.css'; // Import Tabulator CSS
import 'react-tabulator/lib/styles.css'; // Import react-tabulator styles
import { ReactTabulator } from 'react-tabulator';
import React, { useState, useEffect } from 'react';
import { myurl } from '../requestStuff/myurl';

const Editable = () => {
  const [tabledata, setTabledata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(myurl + 'cad_lista_clientes')
      .then((response) => response.json())
      .then((data) => {
        setTabledata(data.dados);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: 'codCliente', field: 'codCliente', width: 200 },
    { title: 'razaoSocial', field: 'razaoSocial', width: 200 },
    { title: 'telefone1', field: 'telefone1', width: 200 },
    { title: 'email', field: 'email', width: 200 },
  ];

  const options = {
    virtualDom: true,
    maxHeight: '50vh',
    selectable: true,
    selectableRangeMode: 'click',
    rowClick: function (e, row) {
      row.toggleSelect();
    },
    autoColumns: true, //create columns from data field names
  };

  return (
    <div style={{ maxHeight: '100px' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReactTabulator data={tabledata} columns={columns} options={options} />
      )}
    </div>
  );
};

export default Editable;
