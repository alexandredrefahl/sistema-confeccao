import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DataTableMui from "../../multiuso/DataTableMui";
import { useState, useContext } from "react";
import Context from "../../multiuso/Context";
import objModelagem from "../../objetosParaRequest/objModelagem";
import Form from "./FormModelagem";

function CadastroModelagem() {
  const [obj, setObj] = useContext(Context);

  const [oQueMostrar, setOqueMostrar] = useState("tabela");

  const qualTabelaUsar = "cadModelagem";

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
          <b>Tipos de Modelagens</b>
        </Button>
      </Grid>
      {oQueMostrar === "tabela" ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={obj}
              setObj={setObj}
              objReseter={objModelagem}
              columns={[
                { field: "id", headerName: "ID", flex: 1 / 10 },
                {
                  field: "Modelagem",
                  headerName: "Tipos de Modelagens",
                  flex: 9 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: "id, Modelagem",
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

export default CadastroModelagem;
