import React, { useState, useEffect } from "react";
import ProductTable from "../Tables/ProductTable";
import { cloneObject } from "../../helpers/cloneObject";
import getProduct from "../../services/product.service.js";
import { Notification } from "../../helpers/notification";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
} from "reactstrap";

const ProductContainer = (props) => {
  const {
    productBudget,
    setProductBudget,
    deleteProduct,
    productTable,
    auxParseRentability,
  } = props;
  const [productCod, setProductCod] = useState([]);
  const [productDescription, setProductDescription] = useState([]);
  const [productList, setProductList] = useState([]);
  const [triggerProduct, setTriggerProduct] = useState(false);

  useEffect(() => {
    const getProductList = async () => {
      if (!triggerProduct) {
        const result = await getProduct.get(productTable);
        setProductList(result);
        setTriggerProduct(true);
      }
    };
    getProductList();
  });

  const getDataProduct = (value, type) => {
    const productSelected = productList.filter((value) => {
      if (productDescription.length > 0) {
        return (
          value.description
            .toLowerCase()
            .indexOf(productDescription.toLowerCase()) >= 0
        );
      } else if (productDescription.length > 0) {
        return (
          value.description
            .toLowerCase()
            .indexOf(productDescription.toLowerCase()) >= 0
        );
      } else if (productCod.length > 0) {
        return value.code === productCod;
      } else {
        return true;
      }
    });
    setProductList(productSelected);
  };

  const handleProductFilter = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "productCod") {
      setProductCod(value);
    }
    if (name === "productDescription") {
      setProductDescription(value);
    }
  };

  const clearFilterProduct = () => {
    setProductCod("");
    setProductDescription("");
    setProductList(productList);
  };

  const toastContent = (
    <div>
      <i
        style={{ fontSize: "18px", marginRight: "10px" }}
        className="tim-icons icon-cart"
      />
      Produto Adicionado
    </div>
  );

  const insertProduct = (index) => {
    const cloneProductBudget = cloneObject(productBudget);
    let isProductAddedIndex;
    let currentProduct = productList[index];
    const isProductAdded = cloneProductBudget.find((value, indexProduct) => {
      if (value.code === currentProduct.code) {
        isProductAddedIndex = indexProduct;
        return true;
      } else return false;
    });

    const quantityAdded = cloneProductBudget[isProductAddedIndex]
      ? cloneProductBudget[isProductAddedIndex].quantity
      : 1;

    if (!isProductAdded) {
      if (!isProductAdded) {
        currentProduct.previousPrice = currentProduct.price;
        currentProduct = auxParseRentability(currentProduct);
        cloneProductBudget.push(currentProduct);
      } else {
        cloneProductBudget[isProductAddedIndex].quantity =
          +cloneProductBudget[isProductAddedIndex].quantity + 1;
      }
    } else {
      Notification(
        "Quantidade de produto adicionado já é igual do estoque disponivel",
        "warning"
      );
      return;
    }
    setProductBudget(cloneProductBudget);
    Notification(toastContent, "success");
     };

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Filtro</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col md="2">
                    <FormGroup>
                      <label>Código</label>
                      <Input
                        placeholder="Informe aqui"
                        type="text"
                        onChange={handleProductFilter}
                        name="productCod"
                        value={productCod}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Descrição</label>
                      <Input
                        placeholder="Informe aqui"
                        type="text"
                        onChange={handleProductFilter}
                        name="productDescription"
                        value={productDescription}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <Button
                      style={{ width: "100%", marginTop: "28px" }}
                      className="btn-fill"
                      onClick={clearFilterProduct}
                      color="warning"
                      type="button"
                    >
                      Limpar
                    </Button>
                  </Col>
                  <Col md="2">
                    <Button
                      style={{ width: "100%", marginTop: "28px" }}
                      className="btn-fill"
                      onClick={getDataProduct}
                      color="primary"
                      type="button"
                    >
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="5">
                  <CardTitle tag="h4">Lista de Produtos</CardTitle>
                </Col>
                <Col md={{ size: 3, offset: 4 }}></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <ProductTable
                productList={productList}
                insertProduct={insertProduct}
                deleteProduct={deleteProduct}
                productBudget={productBudget}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductContainer;
