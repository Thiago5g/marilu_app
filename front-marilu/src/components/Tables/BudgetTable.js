import React from "react";
import { Table } from "reactstrap";
import moment from "moment";
import { BudgetTableStyled } from "./styles";

const BudgetTable = (props) => {
  const {
    budgetList,
    deleteBudgetRow,
    approveBudget,
    reservedBudget,
    editBudget,
    unlockBudget,
    printBudget,
  } = props;

  const parseStatus = {
    approved: "Aprovado",
    reserved: "Reservado",
    canceled: "Cancelado",
    pending: "Pendente",
    blocked: "Bloqueado",
  };

  const parseStatusColor = {
    approved: "green",
    reserved: "blue",
    canceled: "red",
    pending: "#ffd600",
    blocked: "grey",
  };

  return (
    <BudgetTableStyled>
      <Table className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th>ID</th>
            <th>Data</th>
            {/* <th>Cliente</th>
            <th>CNPJ</th> */}
            <th>Valor Total</th>
            <th>Validade</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {budgetList.filter(value => (value.status[value.status.length - 1].status) !== 'approved').map((value, index) => {
            const statusParsed =
              parseStatus[value.status[value.status.length - 1].status];
            return (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{moment(value.createdAt).format("DD/MM/yyyy")}</td>
                {/* <td id="description">{value.client.cliente}</td>
                <td>
                  {value.client.cnpjoucpf
                    ? value.client.cnpjoucpf.replace(
                        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                        "$1.$2.$3/$4-$5"
                      )
                    : ""}
                </td> */}
                <td>
                  R$ {value.total.totalCart.toFixed(2)
                  .replace(/\D/g, "")
                  .replace(/(\d+)(\d{2})/, "$1,$2")
                  .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                  .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                  .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3")}{" "}
                </td>
                <td>{moment(value.validated[0]).format("DD/MM/yyyy")}</td>
                <td>
                  <span
                    style={{
                      color:
                        parseStatusColor[
                          value.status[value.status.length - 1].status
                        ],
                      fontWeight: "600",
                    }}
                  >
                    {parseStatus[value.status[value.status.length - 1].status]}
                  </span>
                </td>
                <td>
                  {statusParsed !== "Reservado" &&
                    statusParsed !== "Aprovado" && (
                      <i
                        style={{ cursor: "pointer" }}
                        title="Fazer reserva"
                        className="tim-icons icon-notes"
                        onClick={() => reservedBudget(value)}
                      />
                    )}
                  {statusParsed !== "Aprovado" && (
                    <i
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      title={
                        statusParsed === "Bloqueado"
                          ? "Desbloquear orçamento"
                          : "Gerar Pedido"
                      }
                      className={`tim-icons ${
                        statusParsed === "Bloqueado"
                          ? "icon-lock-circle"
                          : "icon-check-2"
                      }`}
                      onClick={() =>
                        statusParsed === "Bloqueado"
                          ? unlockBudget(value)
                          : approveBudget(value)
                      }
                    />
                  )}
                  {statusParsed !== "Aprovado" && (
                    <i
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      title="Editar"
                      className="tim-icons icon-pencil"
                      onClick={() => editBudget(value)}
                    />
                  )}
                  {statusParsed !== "Aprovado" && (
                    <i
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      title="Deletar"
                      onClick={() => deleteBudgetRow(value.id)}
                      className="tim-icons icon-trash-simple"
                    />
                  )}
                   <i
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      title="Imprimir"
                      onClick={() => printBudget(value)}
                      className="tim-icons icon-paper"
                    />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </BudgetTableStyled>
  );
};

export default BudgetTable;
