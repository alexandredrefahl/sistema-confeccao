import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableCellClasses = {
  head: "MuiTableCell-head",
  body: "MuiTableCell-body",
};

function tmpItens() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFilho, setProdutosFilho] = useState([]);
  const [quantidade, setQuantidade] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [produtoFilhoId, setProdutoFilhoId] = useState("");
  const [preco, setPreco] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/lista_produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (produtoId) {
      axios
        .get(`http://127.0.0.1:8080/produtos_filho?parent_id=${produtoId}`)
        .then((response) => {
          setProdutosFilho(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [produtoId]);

  function handleProdutoChange(event) {
    setProdutoId(event.target.value);
    setProdutoFilhoId("");
    setPreco("");
  }

  function handleProdutoFilhoChange(event) {
    setProdutoFilhoId(event.target.value);

    axios
      .get(`http://127.0.0.1:8080/produtos_filho/${event.target.value}`)
      .then((response) => {
        setPreco(response.data.preco);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddRow() {
    if (quantidade && produtoId && produtoFilhoId && preco) {
      const newRow = { quantidade, produtoId, produtoFilhoId, preco };
      setRows([...rows, newRow]);
      setQuantidade("");
      setProdutoId("");
      setProdutoFilhoId("");
      setPreco("");
    }
  }

  return (
    <div>
      <TextField
        label="Quantidade"
        value={quantidade}
        onChange={(event) => {
          setQuantidade(event.target.value);
        }}
      />
      <Select label="Produtos" value={produtoId} onChange={handleProdutoChange}>
        {produtos.map((produto) => (
          <MenuItem key={produto.id} value={produto.id}>
            {produto.nome}
          </MenuItem>
        ))}
      </Select>
      <Select
        label="Produtos Filho"
        value={produtoFilhoId}
        onChange={handleProdutoFilhoChange}
      >
        {produtosFilho.map((produtoFilho) => (
          <MenuItem key={produtoFilho.id} value={produtoFilho.id}>
            {produtoFilho.descricao}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Preço"
        value={preco}
        onChange={(event) => {
          setPreco(event.target.value);
        }}
      />
      <Button variant="contained" onClick={handleAddRow}>
        Adicionar
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Quantidade</StyledTableCell>
              <StyledTableCell>ID Produto</StyledTableCell>
              <StyledTableCell>ID Produto Filho</StyledTableCell>
              <StyledTableCell>Preço</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={`${row.produtoId}-${row.produtoFilhoId}`}>
                <StyledTableCell>{row.quantidade}</StyledTableCell>
                <StyledTableCell>{row.produtoId}</StyledTableCell>
                <StyledTableCell>{row.produtoFilhoId}</StyledTableCell>
                <StyledTableCell>{row.preco}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default tmpItens;
