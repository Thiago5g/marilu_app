import { cloneObject } from "helpers/cloneObject";
import React, { useState } from "react";
import { Table, Input } from "reactstrap";
import { PriceTableStyled } from "./styles";
import { isHaveRole } from "helpers";

const PriceTable = (props) => {
  const { priceList, handleChangeInput, toggleEditProduct } = props;

  const [priceValue, setPriceValue] = useState()

  return (
    <PriceTableStyled>    
      {isHaveRole("Admin") && <Table className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Unidade</th>
            <th>Preço unitario</th>
            <th>Margem Risco</th>
            <th>Comissão</th>
            <th className="text-center">Ação</th>
          </tr>
        </thead>
        <tbody>
          {priceList.map((value, index) => {
            const single =
              value.single === undefined ? value.price : value.single;
            return (
              <tr key={index}>
                <td>{value.codproduct}</td>
                <td id="description">{value.description}</td>
                <td>{String(value.unity)}</td>
                <td>
                  R${' '}
                  {value.edit ? (
                    <Input
                      type="text"
                      placeholder={String(parseFloat(value.price).toFixed(2)).replace('.', ',')}
                      // value={String(value.price).replace('.', ',')}
                      name={"price"}
                      onChange={(e) => {
                        setPriceValue(e)
                        handleChangeInput(e, index)
                      }}
                      style={{ width: "70px", display: "inline" }}
                    />
                  ) : (
                    String(parseFloat(single).toFixed(2)).replace('.', ',')
                  )}
                </td>
                <td>
                  {value.edit ? (
                    <Input
                      type="text"
                      // defaultValue={value.security.replace('.', ',')}
                      value={String(value.security).replace('.', ',')}
                      name={"security"}
                      onChange={(e) => handleChangeInput(e, index)}
                      style={{
                        marginLeft: "25px",
                        width: "50px",
                        display: "inline",
                      }}
                    />
                  ) : (
                    String(parseFloat(value.security).toFixed(2)).replace('.', ',')

                  )}
                  %
                </td>
                <td>
                  {value.edit ? (
                    <Input
                      type="text"
                      defaultValue={String(value.commission).replace('.', ',')}
                      name={"commission"}
                      onChange={(e) => handleChangeInput(e, index)}
                      style={{
                        marginLeft: "10px",
                        width: "50px",
                        display: "inline",
                      }}
                    />
                  ) : (
                    String(parseFloat(value.commission).toFixed(2)).replace('.', ',')
                  )}
                  %
                </td>
                <td className="text-center">
                  <i
                    style={{ cursor: "pointer" }}
                    title={`${value.edit ? "Salvar" : "Editar"}`}
                    className={`tim-icons ${value.edit ? "icon-check-2" : "icon-pencil"
                      }`}
                    onClick={() => toggleEditProduct(value, index)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      }
    </PriceTableStyled>
    );
};

export default PriceTable;
