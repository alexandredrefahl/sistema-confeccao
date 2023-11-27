import { useState, useContext, useEffect } from "react";
// Imports de Componentes
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../multiuso/TabPanel";
import Context from "../../multiuso/Context";
import AlertDialog from "../../multiuso/AlertDialog";
import PropTypes from "prop-types";
import GeradorDeInputs from "../../multiuso/GeradorDeInputs";
// Imports de Handles
import { handleChange } from "../../handleChangeStuff/handleChange";
import { handleChangeInt } from "../../handleChangeStuff/handleChangeInt";
// Imports de materiais
import { Divider } from "@mui/material";
// Imports de request
import { incluir } from "../../requestStuff/incluir";

function FormCompManga(props) {
  const [obj, setObj] = useContext(Context);

  const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const btnSalvar = () => {
    obj["tabela"] = props.qualTabelaUsar;

    incluir(obj, () => {
      setRetornoDoBackEnd(true);
    });
  };

  const tab1 = [
    {
      tamanho: 1,
      label: "id",
      name: "id",
      qualComponente: "text",
      type: "number",
      disabled: true,
      value: obj["id"],
      handleChangeProp: (e) => handleChangeInt(e, setObj),
    },
    {
      tamanho: 4,
      label: "Tipo de Comprimento para Mangas",
      name: "CompManga",
      qualComponente: "text",
      value: obj["CompManga"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
  ];

  const depoisDeClicarNoOk_salvarAlterar = () => {
    props.setOqueMostrar("tabela");
    setRetornoDoBackEnd(false);
  };

  return (
    <>
      {retornoDoBackEnd === true ? (
        <AlertDialog
          setAlerta={depoisDeClicarNoOk_salvarAlterar}
          qualMsg={"Dados Lançados com Sucesso!"}
        />
      ) : null}
      <Grid
        item
        xs={12}
        style={{ overflowY: "scroll", width: "100%", height: "80vh" }}
      >
        <Divider />
        <Tabs
          value={value}
          onChange={handleChange2}
          sx={{
            p: 1,
            paddingLeft: 3,
            "& .Mui-selected": {
              outline: "none",
            },
          }}
        >
          <Tab label="Cadastro de Comprimentos para Mangas" />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Cadastro de Comprimentos para Mangas</b>
            </Grid>
            {tab1.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
      </Grid>
      <Grid item xs={12} sx={{ p: 1, height: "20vh" }}>
        <Divider />
        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid item xs={12} style={{ overflow: "auto" }}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => {
                    props.setOqueMostrar("tabela");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    btnSalvar();
                  }}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </>
  );
}
FormCompManga.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};

export default FormCompManga;
