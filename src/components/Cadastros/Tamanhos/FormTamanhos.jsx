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
import AlertDialog from "../../multiuso/AlertDialog";
import { incluir } from "../../requestStuff/incluir";
import { itemListDoBackEnd } from "../../requestStuff/itemListDoBackEnd";

function FormTamanhos(props) {
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
      label: "Descrição da Grade",
      name: "GradeTamanhos",
      qualComponente: "text",
      value: obj["GradeTamanhos"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 7,
      qualComponente: "espaco",
    },
    {
      tamanho: 1,
      label: "I",
      name: "tam01",
      qualComponente: "text",
      value: obj["tam01"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "II",
      name: "tam02",
      qualComponente: "text",
      value: obj["tam02"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "III",
      name: "tam03",
      qualComponente: "text",
      value: obj["tam03"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "IV",
      name: "tam04",
      qualComponente: "text",
      value: obj["tam04"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "V",
      name: "tam05",
      qualComponente: "text",
      value: obj["tam05"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "VI",
      name: "tam06",
      qualComponente: "text",
      value: obj["tam06"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "VII",
      name: "tam07",
      qualComponente: "text",
      value: obj["tam07"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "VIII",
      name: "tam08",
      qualComponente: "text",
      value: obj["tam08"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      qualComponente: "espaco",
      tamanho: 4,
    },
    {
      tamanho: 1,
      label: "IX",
      name: "tam09",
      qualComponente: "text",
      value: obj["tam09"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "X",
      name: "tam10",
      qualComponente: "text",
      value: obj["tam10"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "XI",
      name: "tam11",
      qualComponente: "text",
      value: obj["tam11"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "XII",
      name: "tam12",
      qualComponente: "text",
      value: obj["tam12"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "XIII",
      name: "tam13",
      qualComponente: "text",
      value: obj["tam13"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "XIV",
      name: "tam14",
      qualComponente: "text",
      value: obj["tam14"],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 1,
      label: "XV",
      name: "tam15",
      qualComponente: "text",
      value: obj["tam15"],
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
          <Tab label="Cadastro de Grades de Tamanhos" />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Cadastro de Grades de Tamanhos</b>
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
FormTamanhos.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};

export default FormTamanhos;

/*
function FormTamanho(props) {
  const [obj, setObj] = useContext(Context);
  const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);

  const [optFaixaEtaria, setOptFaixaEtaria] = useState([]);
  const [optFaixaEtariaID, setOptFaixaEtariaID] = useState([]);
  const [optFaixaEtariaInicial, setOptFaixaEtariaInicial] = useState([]);
  const [optFaixaEtariaFinal, setOptFaixaEtariaFinal] = useState([]);

  const [virtuais, setVirtuais] = useState({
    descricao: "",
    inicial: "",
    final: "",
  });

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

  useEffect(() => {
    itemListDoBackEnd(
      "preenche_multi_select",
      [
        ["cadfaixaetaria", "descricao"],
        ["cadfaixaetaria", "id"],
        ["cadfaixaetaria", "inicial"],
        ["cadfaixaetaria", "final"],
      ],
      [
        setOptFaixaEtaria,
        setOptFaixaEtariaID,
        setOptFaixaEtariaInicial,
        setOptFaixaEtariaFinal,
      ]
    ).then();
  }, []);

  useEffect(() => {
    cascata_inicial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    optFaixaEtaria,
    optFaixaEtariaID,
    optFaixaEtariaInicial,
    optFaixaEtariaFinal,
  ]);

  const cascata_inicial = () => {
    var index2 = optFaixaEtariaID.indexOf(obj["parent_id"]);

    if (index2 == -1) {
      return;
    }

    const arr_cascata = [
      ["descricao", setVirtuais, optFaixaEtaria],
      ["inicial", setVirtuais, optFaixaEtariaInicial],
      ["final", setVirtuais, optFaixaEtariaFinal],
    ];

    arr_cascata.map((item) => {
      let name = item[0];
      let funcao = item[1];
      let opt = item[2];

      funcao((prevObj) => ({
        ...prevObj,
        [name]: opt[index2],
      }));
    });
  };

  const handleChange_cascata = (event, setObject, arr_cascata) => {
    const { name, value } = event.target;

    setObject((prevObj) => ({
      ...prevObj,
      [name]: value,
    }));

    var index2 = optFaixaEtaria.indexOf(value);

    arr_cascata.map((item) => {
      let name = item[0];
      let funcao = item[1];
      let opt = item[2];

      funcao((prevObj) => ({
        ...prevObj,
        [name]: opt[index2],
      }));
    });
  };

  const tab1 = [
    {
      tamanho: 2,
      label: "Faixa Etária",
      name: "descricao",
      qualComponente: "select",
      itemList: optFaixaEtaria,
      itemListValue: optFaixaEtaria,
      value: virtuais["descricao"],
      handleChangeProp: (e) =>
        handleChange_cascata(e, setVirtuais, [
          ["parent_id", setObj, optFaixaEtariaID],
          ["inicial", setVirtuais, optFaixaEtariaInicial],
          ["final", setVirtuais, optFaixaEtariaFinal],
        ]),
    },
    {
      tamanho: 2,
      label: "ID da Faixa Etária",
      name: "parent_id",
      qualComponente: "text",
      disabled: true,
      value: obj["parent_id"],
    },
    {
      tamanho: 12,
      qualComponente: "divider",
    },
    {
      tamanho: 2,
      label: "Idade Inicial",
      name: "",
      qualComponente: "text",
      disabled: true,
      value: virtuais["inicial"],
    },
    {
      tamanho: 2,
      label: "Idade Final",
      name: "",
      qualComponente: "text",
      disabled: true,
      value: virtuais["final"],
    },
  ];

  const tab2 = [
    {
      tamanho: 2,
      label: "Tamanhos (separados por ;)",
      name: "Tamanho",
      qualComponente: "text",
      value: obj["Tamanho"],
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
          <Tab label="Escolha a Faixa Etária deste Tamanho" />
          {obj["parent_id"] === "" ? null : <Tab label="Defina o Tamanho" />}
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Escolha a Faixa Etária deste Tamanho</b>
            </Grid>
            {tab1.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Defina o Tamanho</b>
            </Grid>
            {tab2.map((item, index) => (
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
FormTamanho.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};

export default FormTamanho;
*/
