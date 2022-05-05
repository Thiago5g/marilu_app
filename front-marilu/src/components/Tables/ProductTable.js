import React from "react";
import { Table } from "reactstrap";
import { isHaveRole } from "../../helpers";
import { ProductTableStyled } from "./styles";

const ProductTable = (props) => {
  const { productList, insertProduct, productBudget, deleteProduct } = props;

  return (
    <ProductTableStyled>
      <Table className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th>Foto</th>
            <th>Código</th>
            <th>Descrição</th>        
            <th>Unidade</th>
            <th>Preço Unitário</th>            
            <th className="text-center">Ação</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((value, index) => {
            const quantityProduct = 100             
            const indexItemProduct = {};
            const isProductAdded = productBudget.find((item, indexItem) => {
              if (item.code === value.code) {
                indexItemProduct.index = indexItem;
                return true;
              }
              return false;
            });
            if (value.price >= 0) {//quantityProduct > 0
              return (
                <tr
                  style={{
                    background: isProductAdded ? "darkseagreen" : "#fff",
                  }}
                  key={index}
                >
                  <td>{" "}</td>
                  <td>{value.code}</td>
                  <td id="description">{value.description}</td>                  
                  <td>{value.unity}</td>
                  <td>R$ {String(parseFloat(value.price).toFixed(2)).replace(".", ",")}</td>
                   <td className="text-center">
                    <i
                      style={{ cursor: "pointer" }}
                      title={isProductAdded ? "Remover" : "Adicionar"}
                      onClick={() =>
                        isProductAdded
                          ? deleteProduct(indexItemProduct.index)
                          : insertProduct(index)
                      }
                      className={`tim-icons ${
                        isProductAdded ? "icon-trash-simple" : "icon-cart"
                      }`}
                    />
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </Table>
    </ProductTableStyled>
  );
};

export default ProductTable;