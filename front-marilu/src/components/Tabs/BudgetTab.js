import React from 'react'
import CreateBudgetTable from '../Tables/CreateBudgetTable'
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
} from "reactstrap";

const BudgetTab = (props) => {

  const { toggleModalProduct, productBudget, handleChangeQtdProduct, handleChangeSingleValue, deleteProduct, functionRentability, handleChangeSingleValueBlur } = props
  
  return <>
    <Col md="12">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="5">
                    </Col>
                    <Col md={{ size: 3, offset: 4 }}>
                      <Button style={{ width: '100%' }} className="btn-fill" color="primary" type="submit" onClick={toggleModalProduct}>
                        Adicionar Item
                    </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <CreateBudgetTable
                    handleChangeSingleValueBlur={handleChangeSingleValueBlur}
                    productBudget={productBudget}
                    handleChangeSingleValue={handleChangeSingleValue}
                    handleChangeQtdProduct={handleChangeQtdProduct}
                    deleteProduct={deleteProduct}
                    functionRentability={functionRentability}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
    </Col>
  </>
}

export default BudgetTab