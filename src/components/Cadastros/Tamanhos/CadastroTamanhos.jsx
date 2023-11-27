import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DataTableMui from "../../multiuso/DataTableMui";
import { useState, useContext } from "react";
import Context from "../../multiuso/Context";

import Form from "./FormTamanhos";
import objTamanho from "../../objetosParaRequest/objTamanho";

function CadastroTamanhos() {
  const [obj, setObj] = useContext(Context);
  const [oQueMostrar, setOqueMostrar] = useState("tabela");
  const qualTabelaUsar = "cadGradeTamanhos";

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
          <b>Grade de Tamanhos</b>
        </Button>
      </Grid>
      {oQueMostrar === "tabela" ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={obj}
              setObj={setObj}
              objReseter={objTamanho}
              columns={[
                { field: "id", headerName: "ID", flex: 1 / 18 },
                {
                  field: "GradeTamanhos",
                  headerName: "Descrição",
                  flex: 2 / 18,
                },
                { field: "tam01", headerName: "I", flex: 1 / 18 },
                { field: "tam02", headerName: "II", flex: 1 / 18 },
                { field: "tam03", headerName: "III", flex: 1 / 18 },
                { field: "tam04", headerName: "IV", flex: 1 / 18 },
                { field: "tam05", headerName: "V", flex: 1 / 18 },
                { field: "tam06", headerName: "VI", flex: 1 / 18 },
                { field: "tam07", headerName: "VII", flex: 1 / 18 },
                { field: "tam08", headerName: "VIII", flex: 1 / 18 },
                { field: "tam09", headerName: "IX", flex: 1 / 18 },
                { field: "tam10", headerName: "X", flex: 1 / 18 },
                { field: "tam11", headerName: "XI", flex: 1 / 18 },
                { field: "tam12", headerName: "XII", flex: 1 / 18 },
                { field: "tam13", headerName: "XIII", flex: 1 / 18 },
                { field: "tam14", headerName: "XIV", flex: 1 / 18 },
                { field: "tam15", headerName: "XV", flex: 1 / 18 },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas:
                  "id, GradeTamanhos, tam01,tam02,tam03,tam04,tam05,tam06,tam07,tam08,tam09,tam10,tam11,tam12,tam13,tam14,tam15",
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

export default CadastroTamanhos;
