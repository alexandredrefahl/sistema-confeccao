import { DataGrid } from '@mui/x-data-grid';
import { myurl } from '../requestStuff/myurl';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

function DataTableMuiSimple(props) {
  const [rows, setRows] = useState([]);

  const [linhaEscolhida, setLinhaEscolhida] = useState({
    nome: '',
  });

  const [filterText, setFilterText] = useState('');

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  useEffect(() => {
    fetch(myurl + 'tableReader', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tabela: 'produtos',
        escolhaDeColunas: 'id, nome',
        ordenar: 'id',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRows(data.dados);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (row.id === selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row.id);

      props.setObj((prevObj) => ({
        ...prevObj,
        ['produtos_id']: row.id,
      }));

      setLinhaEscolhida((prevObj) => ({
        ...prevObj,
        ['nome']: row.nome,
      }));
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <TextField
            disabled={true}
            value={props.obj['produtos_id']}
            fullWidth
            label={'ID Escolhido'}
            sx={{ pb: 1 }}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            disabled={true}
            fullWidth
            value={linhaEscolhida['nome']}
            label={'Produto Pai Escolhido'}
            sx={{ pb: 1 }}
          />
        </Grid>
      </Grid>
      <TextField
        label=''
        variant='outlined'
        fullWidth
        value={filterText}
        sx={{ pb: 1 }}
        onChange={(e) => setFilterText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <DataGrid
        rows={filterText === '' ? rows : filteredRows}
        columns={[
          { field: 'id', headerName: 'ID', flex: 1 / 10 },
          {
            field: 'nome',
            headerName: 'nome',
            flex: 9 / 10,
          },
        ]}
        disableMultipleSelection={true}
        selectionModel={selectedRow !== null ? [selectedRow] : []}
        onRowClick={(params) => handleRowClick(params.row)}
      />
    </>
  );
}

DataTableMuiSimple.propTypes = {
  obj: PropTypes.object.isRequired,
  setObj: PropTypes.func.isRequired,
};

export default DataTableMuiSimple;
