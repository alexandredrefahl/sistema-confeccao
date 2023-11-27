import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DataTableMui from "../../multiuso/DataTableMui";
import FormCondPag from "./FormCondPag";
import { useState, useContext } from "react";
import Context from "../../multiuso/Context";
import objCondPag from "../../objetosParaRequest/objCondPag";

function CadastroDeCondPag() {
  const [condPag, setCondPag] = useContext(Context);
  const [oQueMostrar, setOqueMostrar] = useState("tabela");
  const qualTabelaUsar = "finCondPag";

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
          <b>Condições de Pagamento</b>
        </Button>
      </Grid>
      {oQueMostrar === "tabela" ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={condPag}
              setObj={setCondPag}
              objReseter={objCondPag}
              columns={[
                { field: "id", headerName: "ID", flex: 1 / 10 },
                {
                  field: "Descricao",
                  headerName: "Descrição",
                  flex: 9 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: "id, Descricao",
                ordenar: "id",
              }}
            />
          </Grid>
        </>
      ) : (
        <FormCondPag
          setOqueMostrar={setOqueMostrar}
          qualTabelaUsar={qualTabelaUsar}
        />
      )}
    </>
  );
}

export default CadastroDeCondPag;
