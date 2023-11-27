import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DataTableMui from "../../multiuso/DataTableMui";
import { useState, useContext } from "react";
import Context from "../../multiuso/Context";
import objFaixaEtaria from "../../objetosParaRequest/objFaixaEtaria";
import FormFaixaEtarias from "./FormFaixaEtarias";

function CadastroDeFaixaEtarias() {
  const [faixaEtaria, setFaixaEtaria] = useContext(Context);
  const [oQueMostrar, setOqueMostrar] = useState("tabela");
  const qualTabelaUsar = "cadFaixaEtaria";

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
          <b>Faixas Etárias</b>
        </Button>
      </Grid>
      {oQueMostrar === "tabela" ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={faixaEtaria}
              setObj={setFaixaEtaria}
              objReseter={objFaixaEtaria}
              columns={[
                { field: "id", headerName: "ID", flex: 1 / 10 },
                {
                  field: "descricao",
                  headerName: "Descricao",
                  flex: 9 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: "id, descricao",
                ordenar: "id",
              }}
            />
          </Grid>
        </>
      ) : (
        <FormFaixaEtarias
          setOqueMostrar={setOqueMostrar}
          qualTabelaUsar={qualTabelaUsar}
        />
      )}
    </>
  );
}

export default CadastroDeFaixaEtarias;
