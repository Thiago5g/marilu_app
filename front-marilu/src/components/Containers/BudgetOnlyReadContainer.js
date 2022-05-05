import React, {useState, useEffect} from 'react'
import { Line } from "react-chartjs-2";
import { chartExample1 } from "../../variables/charts.js";
import { ContainerTab } from '../../assets/custom/tab-style-container'
import budgetService from '../../services/budget.service'
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";

const BudgetContainer = (props) => {

  const { budgetData } = props
  const [activeTabModal, setActiveTabModal] = useState('1');
  const [bigChartData] = useState('data1')

  const toggleTabModal = tab => {
    if (activeTabModal !== tab) setActiveTabModal(tab);
  }

  return <>
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Dados do Cliente</CardTitle>
          </CardHeader>
          <CardBody>
            <Col md="12">
                <Row>
                  <Col md="2">
                    <FormGroup>
                      <label>Código</label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={budgetData.cod}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <label>Razão Social</label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <label>Nome Fantasia</label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={budgetList.cliente}>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <FormGroup>
                      <label>CPF ou CNPJ</label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label>
                        Inscrição Estadual
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>
                        Endereço
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <FormGroup>
                      <label>
                        Bairro
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label>Cidade</label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="1">
                    <FormGroup>
                      <label>
                        Estado
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <label>
                        CEP
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="1">
                    <FormGroup>
                      <label>
                        DDD
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <label>
                        Telefone
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <FormGroup>
                      <label>
                        E-mail
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label>
                        Responsável
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label>
                        Cargo
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label>
                        Contato
                      </label>
                      <Input
                        defaultValue=""
                        type="text"
                        value={'aaaa'}>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
            </Col>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <ContainerTab>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTabModal === '1' ? 'active' : ''}
                onClick={() => { toggleTabModal('1'); }}
              >
                Lista de itens
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTabModal === '2' ? 'active' : ''}
                onClick={() => { toggleTabModal('2'); }}
              >
                Crédito
          </NavLink>
            </NavItem>
            {/* <NavItem>
            <NavLink
              className={activeTabModal === '3' ? 'active' : ''}
              onClick={() => { toggleTabModal('3'); }}
            >
              Gráfico
          </NavLink>
          </NavItem> */}
          </Nav>
        </ContainerTab>
        <TabContent activeTab={activeTabModal}>
          <TabPane tabId="1">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Código</th>
                          <th>Descrição do item</th>
                          <th>Qtde</th>
                          <th>Un</th>
                          <th>Vlr Unitário</th>
                          <th>Vlr Total</th>
                          <th>Rent.</th>
                          <th>Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[].map((value, index) => {
                          const quantity = value.quantity !== undefined ? value.quantity : 1
                          const totalRentability = ((quantity * value.unitario) - (quantity * value.customedio)) / (quantity * value.unitario) * (100)
                          const single = value.single === undefined ? value.unitario : value.single
                          return <tr key={index} >
                            <td>{value.code}</td>
                            <td>{value.description}</td>
                            <td><Input type="number" name={`product-${index}`} value={quantity} style={{ width: '60px' }} /></td>
                            <td>{value.unity}</td>
                            <td>R$ <Input type="text" name={`product-${index}`} value={String(parseFloat(single).toFixed(2)).replace('.', ',')} style={{ width: '70px', display: 'inline' }} /></td>
                            <td>{`R$ ${String(parseFloat(quantity * value.unitario).toFixed(2)).replace('.', ',')}`}</td>
                            <td>R$ {totalRentability.toFixed(2)}</td>
                            <td>
                              <i style={{ marginLeft: '8px', cursor: 'pointer' }} title="Deletar" className="tim-icons icon-trash-simple" />
                            </td>
                          </tr>
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Overview de Crédito</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md={{ size: 2, offset: 2 }}>
                        <h5>Títulos vencidos:</h5>
                      </Col>
                      <Col md="2">
                        <h5><b>{'aaaa'}</b></h5>
                      </Col>
                      <Col md="2">
                        <h5>Primeira Compra:</h5>
                      </Col>
                      <Col md="2">
                        <h5>{'aaaa'}</h5>
                      </Col>

                      <Col md={{ size: 2, offset: 2 }}>
                        <h5>Títulos em aberto:</h5>
                      </Col>
                      <Col md="2">
                        <h5>R$ {'aaaa'}</h5>
                      </Col>
                      <Col md="2">
                        <h5>Ultima compra:</h5>
                      </Col>
                      <Col md="2">
                        <h5>{'aaaa'}</h5>
                      </Col>

                      <Col md={{ size: 2, offset: 2 }}>
                        <h5>Limite de crédito:</h5>
                      </Col>
                      <Col md="2">
                        <h5>R$ {'aaaa'}</h5>
                      </Col>
                      <Col md="2">
                        <h5>Maior compra:</h5>
                      </Col>
                      <Col md="2">
                        <h5>R$ {'aaaa'}</h5>
                      </Col>

                      <Col md={{ size: 2, offset: 2 }}>
                        <h5><b>Saldo de crédito =</b></h5>
                      </Col>
                      <Col md="2">
                        <h5><b>R$ {'aaaa'}</b></h5>
                      </Col>
                      <Col md="2">
                        {/* <h5></h5> */}
                      </Col>
                      <Col md="2">
                        {/* <h5></h5> */}
                      </Col>

                      <Col md={{ size: 2, offset: 2 }}>
                        <h5>Media de atraso:</h5>
                      </Col>
                      <Col md="2">
                        <h5>{'aaaa'}</h5>
                      </Col>
                      <Col md="2">
                        <h5>Títulos protestados:</h5>
                      </Col>
                      <Col md="2">
                        <h5>R$ {'aaaa'}</h5>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">
                      Movimentos por tempo
                </CardTitle>
                  </CardHeader>
                  <CardBody style={{ height: '250px' }}>
                    <div className="chart-area" style={{ height: '100%' }}>
                      <Line
                        data={chartExample1[bigChartData]}
                        options={chartExample1.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <Card>
          <CardBody>
            <Form>
              <Row>
                <Col md="2">
                  <FormGroup>
                    <label>Total Geral</label>
                    <Input
                      defaultValue=""
                      placeholder="Informe aqui"
                      type="text"
                    // value={`R$ ${(totalShoppingCart()).totalCart.toFixed(2)}`}
                    />
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">
                      Mix
                    </label>
                    <Input
                      placeholder="Informe aqui"
                      type="text"
                    // value={`${(totalShoppingCart()).totalProfitability}%`} 
                    />
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">
                      Rentabilidade Líquida
                    </label>
                    <Input
                      placeholder="Informe aqui"
                      type="text"
                    // value={`R$ ${(totalShoppingCart()).realRentability.toFixed(2)}`} 
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <label>Validade</label>
                    <Input
                      defaultValue=""
                      placeholder="Informe aqui"
                      type="date"
                      value={'aaaa'}
                    />
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <label>Tipo de frete</label>
                    <Input
                      type={"select"}
                      defaultValue=""
                      placeholder="Informe aqui"
                      // value={typeDelivery}
                      key="index">
                      <option></option>
                      <option value='CIF'>CIF</option>
                      <option value='FOB'>FOB</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="2">
                  <FormGroup>
                    <label>Condição de pagamento</label>
                    <Input
                      type={"select"}
                      defaultValue=""
                      placeholder="Informe aqui"
                      // value={paymentInput}
                      key="index">
                      <option></option>
                      {[].map(value => <option>{value.description.replaceAll(',', '/')}</option>)}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <label>Ipi</label>
                    <Input
                      type={"select"}
                      defaultValue=""
                      placeholder="i"
                      // value={0}
                      key="index">
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="2">
                  <Button style={{ width: '100%', marginTop: '28px' }}
                    className="btn-fill"
                    color="primary"
                    type="button"
                    onClick={props.toggleModalRead}>
                    Concluir
                </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </>
}

export default BudgetContainer