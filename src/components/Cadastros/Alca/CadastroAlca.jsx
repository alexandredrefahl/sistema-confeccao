import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DataTableMui from "../../multiuso/DataTableMui";
import { useState, useContext } from "react";
import Context from "../../multiuso/Context";
import objAlca from "../../objetosParaRequest/objAlca";
import Form from "./FormAlca";

function CadastroAlca() {
  const [obj, setObj] = useContext(Context);

  const [oQueMostrar, setOqueMostrar] = useState("tabela");

  const qualTabelaUsar = "cadAlca";

  const buttonStyles = {
    "&.Mui-disabled": {
      color: "#007BFF",
      borderColor: "#007BFF",
    },
  };

  return (
    <>
      <Grid item xs={12} sx={{ p: 1 }}>
        <Button
          color="primary"
          variant="outlined"
          sx={buttonStyles}
          fullWidth
          disabled
          size="large"
        >
          <b>Tipos de Alças</b>
        </Button>
      </Grid>
      {oQueMostrar === "tabela" ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={obj}
              setObj={setObj}
              objReseter={objAlca}
              columns={[
                { field: "id", headerName: "ID", flex: 1 / 10 },
                {
                  field: "Alca",
                  headerName: "Tipo de Alça",
                  flex: 9 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: "id, Alca",
                ordenar: "id",
              }}
            />
          </Grid>
        </>
      ) : (
        <Form setOqueMostrar={setOqueMostrar} qualTabelaUsar={qualTabelaUsar} />
      )}
    </>
  );
}

export default CadastroAlca;
