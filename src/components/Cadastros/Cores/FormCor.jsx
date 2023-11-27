import { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../multiuso/TabPanel";
import Context from "../../multiuso/Context";
import { handleChange } from "../../handleChangeStuff/handleChange";

import { Divider } from "@mui/material";
import PropTypes from "prop-types";
import GeradorDeInputs from "../../multiuso/GeradorDeInputs";
// import { cad_incluir_FormaPag } from '../../requestStuff/cad_incluir_FormaPag';

import AlertDialog from "../../multiuso/AlertDialog";
import { handleChangeInt } from "../../handleChangeStuff/handleChangeInt";
import { incluir } from "../../requestStuff/incluir";

function FormCor(props) {
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
      tamanho: 2,
      label: "ID",
      name: "id",
      qualComponente: "text",
      type: "number",
      itemlist: "",
      disabled: true,
      value: obj["id"],
      handleChangeProp: (e) => handleChangeInt(e, setObj),
    },
    {
      tamanho: 2,
      label: "Código",
      name: "Codigo",
      qualComponente: "text",
      itemlist: "",
      value: obj["Codigo"],
      handleChangeProp: (e) => handleChangeInt(e, setObj),
    },
    {
      tamanho: 2,
      label: "Código no WBuy",
      name: "codWbuy",
      qualComponente: "text",
      itemlist: "",
      value: obj["codWbuy"],
      handleChangeProp: (e) => handleChangeInt(e, setObj),
    },
    {
      tamanho: 12,
      qualComponente: "divider",
    },
    {
      tamanho: 6,
      label: "Descrição da Cor",
      name: "Cor",
      qualComponente: "text",
      value: obj["Cor"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 6,
      qualComponente: "espaco",
    },
    {
      tamanho: 12,
      qualComponente: "divider",
    },
    {
      tamanho: 2,
      label: "Valor Hexadecimal",
      name: "Hexa",
      qualComponente: "text",
      value: obj["Hexa"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 2,
      label: "Valor RGB",
      name: "RGB",
      qualComponente: "text",
      value: obj["RGB"],
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
          <Tab label="Cadastro de Cores" />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Cadastro de Cores</b>
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
FormCor.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};

export default FormCor;
