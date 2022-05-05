import React, { useState, useEffect } from "react"
import PriceTable from '../components/Tables/PriceTable'
import priceManager from '../services/priceManager.service'
import { cloneObject } from '../helpers/cloneObject'
import priceService from '../services/priceManager.service'
import { Notification } from '../helpers/notification'
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
  Collapse
} from "reactstrap";

function TablePrice() {

  const [priceList, setPriceList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [productCod, setProductCod] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productTable, setProductTable] = useState('000')
  const [listInicialized, setListInicialized] = useState(false)

  useEffect(() => {
    const getPriceList = async () => {
      const result = await priceManager.get()
      if (result.length > 0 && priceList.length === 0) {
        setListInicialized(true)
        setPriceList(result)
      }
    }
    if(!listInicialized) getPriceList()
  })

  const updateProduct = async (data) => {
    delete data.edit
    const result = await priceService.put(data)
    if (result.update === 'success') {
      Notification('Produtos atualizados com sucesso', 'success')
    } else {
      Notification('Não foi possível atualizar os produtos', 'danger')
    }
  }

  const handleChangeInput = (e, index) => {
    const cloneUpdatePricelist = cloneObject(priceList)
    const { name, value } = e.target
    const valueTest = String(value).replace(',', '.')
    cloneUpdatePricelist[index][name] = valueTest
    setPriceList(cloneUpdatePricelist)
  }

  const getDataProduct = async (value, type) => {
    const filter = {productCod, productDescription, productTable}
    const result = await priceManager.post(filter)
    if(result.error){
      Notification('Não foi possível filtrar os produtos', 'danger')
      return null
    }
    setPriceList(result)
  }

  const toggleEditProduct = (value, index) => {
    const clonePriceList = cloneObject(priceList)
    if (value.edit) {
      value.edit = false
      updateProduct(value)
    }
    else value.edit = true
    clonePriceList[index] = value
    setPriceList(clonePriceList)
  }

  const handleChangeTable = (e) => {
    e.preventDefault()
    const { value } = e.target
    setProductTable(value)
  }

  const handleProductFilter = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    if (name === 'productCod') {
      setProductCod(value)
    }
    if (name === 'productDescription') {
      setProductDescription(value)
    }
  }

  const clearFilterProduct = async () => {
    setProductCod('')
    setProductDescription('')
    setProductTable('000')
    const result = await priceManager.get()
    setPriceList(result)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{marginBottom: '10px'}}>
              <Row>
                  <Col md="1">
                    <CardTitle tag="h4">Filtro</CardTitle>
                  </Col>
                  <Col md="10">
                    <hr></hr>
                  </Col>
                  <Col style={{ textAlign: "center" }} md="1">
                    {isOpen ? <i style={{ cursor: 'pointer' }}
                      className="tim-icons icon-minimal-up"
                      onClick={() => setIsOpen(false)} /> :
                      <i style={{ cursor: 'pointer' }}
                        className="tim-icons icon-minimal-down"
                        onClick={() => setIsOpen(true)} />
                    }
                  </Col>
                </Row>
              </CardHeader>
              <Collapse isOpen={isOpen}>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="2">
                      <FormGroup>
                        <label>Tabela de Preço</label>
                        <Input
                          value={productTable}
                          placeholder="Informe aqui"
                          type="select"
                          key="index"
                          onChange={handleChangeTable}
                        >
                          <option value='000'>Todas</option>
                          <option value='001'>Distribuidores</option>
                          <option value='002'>Cliente Final</option>
                          {/* <option value='003'>Consumidor Final</option> */}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                        Código
                          </label>
                        <Input
                          placeholder="Informe aqui"
                          type="text"
                          onChange={handleProductFilter}
                          name='productCod'
                          value={productCod} />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Descrição</label>
                        <Input
                          placeholder="Informe aqui"
                          type="text"
                          onChange={handleProductFilter}
                          name='productDescription'
                          value={productDescription}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                  <Button
                    style={{ width: '100%', marginTop: '23px' }}
                    className="btn-fill"
                    onClick={clearFilterProduct}
                    color="warning"
                    type="button">
                      Limpar
                  </Button>
                  </Col>
                  <Col md="2">
                    <Button
                      style={{ width: '100%', marginTop: '23px' }}
                      className="btn-fill"
                      onClick={getDataProduct}
                      color="primary"
                      type="button">
                      Buscar
                     </Button>
                  </Col>
                  </Row>
                </Form>
              </CardBody>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="5">
                    <CardTitle tag="h4">
                  Lista de Produtos
                    </CardTitle>
                  </Col>
                  <Col md={{ size: 2, offset: 5}}>
                    {/* <Button
                      style={{ width: '100%' }}
                      className="btn-fill"
                      onClick={updateProducts}
                      color="primary"
                      type="button">
                      Salvar
                     </Button> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <PriceTable 
                  priceList={priceList}
                  toggleEditProduct={toggleEditProduct}
                  handleChangeInput={handleChangeInput}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default TablePrice;
