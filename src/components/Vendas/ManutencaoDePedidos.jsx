import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DataTableMui from "../multiuso/DataTableMui";
import FormPedido from "./PedidoDeVenda";
import { useState, useContext } from "react";
import Context from "../multiuso/Context";
import objPedido from "../objetosParaRequest/objPedidoDeVenda";

function PedidoDeVenda() {
  const [pedido, setPedido] = useContext(Context);
  const [oQueMostrar, setOqueMostrar] = useState("tabela");
  const qualTabelaUsar = "pedidos";

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
          <b>Pedidos de Venda</b>
        </Button>
      </Grid>
      {oQueMostrar === "tabela" ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={pedido}
              setObj={setPedido}
              objReseter={objPedido}
              columns={[
                { field: "id", headerName: "Nº", flex: 1 / 12 },
                { field: "Data", headerName: "Data", flex: 1 / 12 },
                { field: "idCliente", headerName: "Cód", flex: 1 / 12 },
                { field: "Cliente", headerName: "Cliente", flex: 4 / 12 },
                { field: "CNPJ_CPF", headerName: "CNPJ/CPF", flex: 1 / 12 },
                { field: "nItens", headerName: "Nº Itens", flex: 1 / 12 },
                { field: "nPecas", headerName: "Nº Peças", flex: 1 / 12 },
                { field: "valTotal", headerName: "Valor", flex: 1 / 12 },
                { field: "Status_Geral", headerName: "ST", flex: 1 / 12 },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas:
                  "id, Data, idCliente, Cliente, CNPJ_CPF, nItens, nPecas, valTotal, Status_Geral",
                ordenar: "id",
              }}
            />
          </Grid>
        </>
      ) : (
        <FormPedido
          setOqueMostrar={setOqueMostrar}
          qualTabelaUsar={qualTabelaUsar}
        />
      )}
    </>
  );
}

export default PedidoDeVenda;
