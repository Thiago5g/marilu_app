import React from "react";
import { Table } from "reactstrap";
import moment from "moment";
import { OrderTableStyled } from "./styles";

const OrderTable = (props) => {
  const { readOnlyOrder, orderList, deleteOrderRow } = props;

  return (
    <OrderTableStyled>
      <Table className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th>ID</th>
            <th id="order-server">ID Protheus</th>
            <th>Data</th>
            {/* <th>Cliente</th>
            <th>CNPJ</th> */}
            <th>Valor Total</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.orderServer}</td>
                <td>{moment(value.createdAt).format("DD/MM/yyyy")}</td>
                {/* <td id="description">{value.client.cliente}</td>
                <td>
                  {value.client.cnpjoucpf.replace(
                    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                    "$1.$2.$3/$4-$5"
                  )}
                </td> */}
                <td>R$ {value.total.totalCart.toFixed(2).replace(".", ",")}</td>
                <td>
                  <i
                    style={{ marginLeft: "8px", cursor: "pointer" }}
                    title="Visualizar"
                    className="tim-icons icon-zoom-split"
                    onClick={() => readOnlyOrder(value)}
                  />
                  <i
                    style={{ marginLeft: "8px", cursor: "pointer" }}
                    title="Deletar"
                    onClick={() => deleteOrderRow(value.id, value.fk_budget)}
                    className="tim-icons icon-trash-simple"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </OrderTableStyled>
  );
};

export default OrderTable;
