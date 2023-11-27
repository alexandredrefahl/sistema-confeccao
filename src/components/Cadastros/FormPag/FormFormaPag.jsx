import { useState, useContext } from "react";
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
import AlertDialog from "../../multiuso/AlertDialog";
import { incluir } from "../../requestStuff/incluir";

function FormFormaPag(props) {
  const [condPag, setCondPag] = useContext(Context);
  const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const btnSalvar = () => {
    condPag["tabela"] = props.qualTabelaUsar;
    incluir(condPag, () => {
      setRetornoDoBackEnd(true);
    });
  };

  const tab1 = [
    {
      tamanho: 1,
      label: "id",
      name: "id",
      qualComponente: "text",
      itemlist: "",
      value: condPag["id"],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 4,
      label: "Descrição",
      name: "forma",
      qualComponente: "text",
      itemlist: "",
      value: condPag["forma"],
      maxLength: 45,
      handleChangeProp: (e) => handleChange(e, setCondPag),
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
          <Tab label="Cadastro de Forma de Pagamento" />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Cadastro de Forma de Pagamento</b>
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
FormFormaPag.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};

export default FormFormaPag;
