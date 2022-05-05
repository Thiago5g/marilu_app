import React, { useState } from "react";
import { Table, Input } from "reactstrap";
// import { Input } from 'bootstrap'
import { isHaveRole } from "../../helpers";
import { CreateBudgetTableStyled } from "./styles";


const ProductTable = (props) => {
  const {
    productBudget,
    handleChangeQtdProduct,
    handleChangeSingleValue,
    deleteProduct,
    handleChangeSingleValueBlur,
  } = props;

  // const [blockPriceDiscount, setBlockPriceDiscount] = useState(false)

  // const handleBlockDiscount =async () => {
  //   localStorage.setItem('blockDiscount', 2)

  //   const blockPriceDiscountData = await localStorage.getItem('blockDiscount')

  //   if(blockPriceDiscountData === 1) setBlockPriceDiscount(true)
  //   if(blockPriceDiscountData === 1) setBlockPriceDiscount(false)

  //   console.log(blockPriceDiscount, 'blockkkk 1')
  // }

  // console.log(blockPriceDiscount, 'blockPriceDiscount')
    
  const blockProductPriceDiscount = localStorage.getItem('blockDiscount') === '1' ? true : false    
  

  return (
    <CreateBudgetTableStyled>
      <Table className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th>Código</th>
            <th>Descrição do item</th>
            <th>Qtde</th>
            <th>Un</th>
            <th>Qtde P/ Caixa</th>
            <th>Vlr Unitário</th>
            <th>Vlr Total</th>
            <th>Desconto</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {productBudget.map((value, index) => {
            const quantity = value.quantity;
            const quantityEmb = value.qtdEmb;
            const total = quantity * value.price;
            // const valueUpdated = parseInt(value.price).toFixed(2);
             return (
              <tr key={index}>
                <td>{value.code}</td>
                <td id="description">{value.description}</td>
                <td>
                <td>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleChangeQtdProduct(e, index)}
                    style={{ width: "80px" }}
                  />
                </td>
                </td>
                <td>{value.unity}</td>
                <td>{value.qtdEmb}</td>
                <td>              
                    {parseFloat(value.price).toFixed(2)}
                </td>
                <td>{`R$ ${String(parseFloat(total).toFixed(2)).replace('.', ',')
                  .replace(/\D/g, "")
                  .replace(/(\d+)(\d{2})/, "$1,$2")
                  .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                  .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                  .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3")
              }`}</td>
                <td style={{ marginLeft: "20px", width: "50px" }}>
                <Input
                    type="number"
                    disabled={blockProductPriceDiscount}
                    //value={(String(value.price).replace('.', ','))}
                    defaultValue={parseFloat(0).toFixed(2)}
                    //Value={String(parseFloat(value.price).toFixed(2)).replace('.', ',')}
                    onChange={(e) => handleChangeSingleValue(e, index)}
                    onBlur={(e) => handleChangeSingleValueBlur(e, index)}
                    style={{ width: "80px", display: "inline" }}
                  />
                 </td>
                <td>
                  <i
                    style={{ marginLeft: "8px", cursor: "pointer" }}
                    title="Deletar"
                    onClick={() => deleteProduct(index)}
                    className="tim-icons icon-trash-simple"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </CreateBudgetTableStyled>
  );
};

export default ProductTable;
