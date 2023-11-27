import { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../multiuso/TabPanel";
import Context from "../../multiuso/Context";
import GeradorDeInputs from "../../multiuso/GeradorDeInputs";
import { handleChange } from "../../handleChangeStuff/handleChange";
import PropTypes from "prop-types";
import { Divider } from "@mui/material";
import AlertDialog from "../../multiuso/AlertDialog";
import { incluir } from "../../requestStuff/incluir";

function FormCondPag(props) {
  const [condPag, setCondPag] = useContext(Context);
  const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);

  const [value, setValue] = useState(0);

  const btnSalvar = () => {
    condPag["tabela"] = props.qualTabelaUsar;
    incluir(setCondPag, () => {
      setRetornoDoBackEnd(true);
    });
  };

  const depoisDeClicarNoOk_salvarAlterar = () => {
    props.setOqueMostrar("tabela");
    setRetornoDoBackEnd(false);
  };

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const tab1 = [
    {
      tamanho: 2,
      label: "id",
      name: "id",
      qualComponente: "text",
      disabled: true,
      value: condPag["id"],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 10,
      qualComponente: "espaco",
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 6,
      label: "Descrição",
      name: "Descricao",
      qualComponente: "text",
      maxLength: 45,
      value: condPag["Descricao"],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 6,
      qualComponente: "espaco",
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 4,
      label: "Vencimentos (Ex: 28;56)",
      name: "vencimentos",
      qualComponente: "text",
      maxLength: 60,
      value: condPag["vencimentos"],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 4,
      label: "Porcentagens (Ex: 0.50;0.50)",
      name: "porcentagens",
      maxLength: 60,
      qualComponente: "text",
      value: condPag["porcentagens"],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 2,
      label: "Taxa",
      name: "taxa",
      qualComponente: "text",
      maxLength: 5,
      value: condPag["taxa"],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
  ];

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
          <Tab label="Condições de Pagamento" />
        </Tabs>
        <Divider />

        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Condições de Pagamento</b>
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
FormCondPag.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};
export default FormCondPag;
