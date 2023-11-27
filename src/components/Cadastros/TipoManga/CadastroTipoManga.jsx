import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DataTableMui from "../../multiuso/DataTableMui";
import { useState, useContext } from "react";
import Context from "../../multiuso/Context";
import objTipoManga from "../../objetosParaRequest/objTipoManga";
import Form from "./FormTipoManga";

function CadastroTipoManga() {
  const [obj, setObj] = useContext(Context);

  const [oQueMostrar, setOqueMostrar] = useState("tabela");

  const qualTabelaUsar = "cadTipoManga";

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
          <b>Tipos de Tipos de Mangas</b>
        </Button>
      </Grid>
      {oQueMostrar === "tabela" ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={obj}
              setObj={setObj}
              objReseter={objTipoManga}
              columns={[
                { field: "id", headerName: "ID", flex: 1 / 10 },
                {
                  field: "TipoManga",
                  headerName: "Tipo de Mangas",
                  flex: 9 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: "id, TipoManga",
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

export default CadastroTipoManga;
