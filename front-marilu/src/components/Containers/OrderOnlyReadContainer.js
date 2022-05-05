import React, { useState } from 'react'
import { Line } from "react-chartjs-2";
import moment from 'moment'
import { chartExample1 } from "../../variables/charts.js";
import { ContainerTab } from '../../assets/custom/tab-style-container'
import { isHaveRole } from '../../helpers'
import {
  Card,
  CardBody,
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

const OrderOnlyReadContainer = (props) => {

  const { orderData } = props
  const [activeTabModal, setActiveTabModal] = useState('1');
  const [bigChartData] = useState('data1')

  const toggleTabModal = tab => {
    if (activeTabModal !== tab) setActiveTabModal(tab);
  }
  console.log(JSON.stringify(orderData))

  const haveRole = isHaveRole('Admin')

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
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.cod}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="5">
                  <FormGroup>
                    <label>Razão Social</label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.cliente}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="5">
                  <FormGroup>
                    <label>Nome Fantasia</label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.nomeFantasia}
                    >
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <label>CPF ou CNPJ</label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.cnpjoucpf.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <label>
                      Inscrição Estadual
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.inscr.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})/, "$1.$2.$3.$4")}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>
                      Endereço
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.endereco}>
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
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.bairro}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <label>Cidade</label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.cidade}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                    <label>
                      Estado
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.estado}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <label>
                      CEP
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.cep.replace(/^(\d{5})(\d{3})/, "$1-$2")}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                    <label>
                      DDD
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.ddd}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <label>
                      Telefone
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.telefone}>
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
                      readOnly={true}
                      type="text"
                      defaultValue={orderData.client.email}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <label>
                      Responsável
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={''}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <label>
                      Cargo
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={''}>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <label>
                      Contato
                    </label>
                    <Input
                      readOnly={true}
                      type="text"
                      defaultValue={''}>
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
                    {haveRole ?
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
                            <th>Comissão</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderData.products.map((value, index) => {
                            const functionRentability = (quantity, price, customedio) => {
                              const totalPrice = value.quantity * value.price
                              const totalCusto = value.quantity * value.customedio
                              const rentability = ((totalPrice - totalCusto) / totalPrice) * 100
                              return rentability
                            }
                            return <tr key={index} >
                              <td>{value.code}</td>
                              <td>{value.description}</td>
                              <td>{value.quantity}</td>
                              <td>{value.unity}</td>
                              <td>R$ {String(parseFloat(value.price).toFixed(2)).replace('.', ',')} </td>
                              <td>{`R$ ${String(parseFloat(value.quantity * value.price).toFixed(2)).replace('.', ',')}`}</td>
                              <td>{String(functionRentability(value.quantity, value.price, value.customedio).toFixed(2)).replace('.', ',')}%</td>
                              <td>{String(parseFloat(value.commission).toFixed(2)).replace('.', ',')} %</td>
                            </tr>
                          })}
                        </tbody>
                      </Table> :
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Código</th>
                            <th>Descrição do item</th>
                            <th>Qtde</th>
                            <th>Un</th>
                            <th>Vlr Unitário</th>
                            <th>Vlr Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderData.products.map((value, index) => {
                            return <tr key={index} >
                              <td>{value.code}</td>
                              <td>{value.description}</td>
                              <td>{value.quantity}</td>
                              <td>{value.unity}</td>
                              <td>R$ {String(parseFloat(value.price).toFixed(2)).replace('.', ',')} </td>
                              <td>{`R$ ${String(parseFloat(value.quantity * value.price).toFixed(2)).replace('.', ',')}`}</td>
                            </tr>
                          })}
                        </tbody>
                      </Table>
                    }
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
                        <h5><b>{orderData.client.titulosvencidos ? parseInt(orderData.client.titulosvencidos.replace('.', ',')).toFixed(0) : ''}</b></h5>
                      </Col>
                      <Col md="2">
                        <h5>Primeira Compra:</h5>
                      </Col>
                      <Col md="2">
                        <h5>{moment(orderData.client.pricom).format('DD/MM/yyyy')}</h5>
                      </Col>

                      <Col md={{ size: 2, offset: 2 }}>
                        <h5>Títulos em aberto:</h5>
                      </Col>
                      <Col md="2">
                        <h5>R$ {orderData.client.saldoaberto ? String(parseFloat(orderData.client.saldoaberto).toFixed(2))
                            .replace(/\D/g, "")
                            .replace(/(\d+)(\d{2})/, "$1,$2")
                            .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                            .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                            .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3")
                          : ''}</h5>
                      </Col>
                      <Col md="2">
                        <h5>Ultima compra:</h5>
                      </Col>
                      <Col md="2">
                        <h5>{moment(orderData.client.ultcom).format('DD/MM/yyyy')}</h5>
                      </Col>

                      <Col md={{ size: 2, offset: 2 }}>
                        <h5>Limite de crédito:</h5>
                      </Col>
                      <Col md="2">
                        <h5>R$ {orderData.client.limitecredito ? String(parseInt(orderData.client.limitecredito).toFixed(2))
                          .replace(/\D/g, "")
                          .replace(/(\d+)(\d{2})/, "$1,$2")
                          .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                          .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                          .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3") : ''}
                        </h5>
                      </Col>
                      <Col md="2">
                        <h5>Maior compra:</h5>
                      </Col>
                      <Col md="2">
                        <h5>R$ {orderData.client.maiorcompra ? String(parseFloat(orderData.client.maiorcompra).toFixed(2))
                          .replace(/\D/g, "")
                          .replace(/(\d+)(\d{2})/, "$1,$2")
                          .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                          .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                          .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3") : ''}
                        </h5>
                      </Col>

                      <Col md={{ size: 2, offset: 2 }}>
                        <h5><b>Saldo de crédito =</b></h5>
                      </Col>
                      <Col md="2">
                        <h5>
                          <b>
                            R$ {String(parseFloat(orderData.client.saldoaberto).toFixed(2))
                              .replace(/\D/g, "")
                              .replace(/(\d+)(\d{2})/, "$1,$2")
                              .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                              .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                              .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3")}
                          </b>
                        </h5>
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
                        <h5>{orderData.client.mediaatraso.replace('.', ',')}</h5>
                      </Col>
                      <Col md="2">
                        <h5>Títulos protestados:</h5>
                      </Col>
                      <Col md="2">
                        <h5>R$ {orderData.client.titulosprotestados.replace('.', ',')}</h5>
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
                <Col md={{ size: `${haveRole ? 3 : 4}` }}>
                  <FormGroup>
                    <label>Total Geral</label>
                    <Input
                      onChange={() => false}
                      type="text"
                      value={String(parseFloat(orderData.total.totalCart).toFixed(2))
                        .replace(/\D/g, "")
                        .replace(/(\d+)(\d{2})/, "$1,$2")
                        .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                        .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                        .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3")}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md={{ size: `${haveRole ? 3 : 4}` }}>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Mix</label>
                    <Input
                      type="text"
                      value={String(parseFloat(orderData.total.mix).toFixed(2)).replace('.', ',')}
                      disabled
                    />
                  </FormGroup>
                </Col>
                {haveRole && (
                  <Col md="3">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">
                        Rentabilidade Líquida
                      </label>
                      <Input
                        type="text"
                        value={String(orderData.total.totalRentability).replace('.', ',').toLocaleString('pt-BR')}

                        disabled
                      />
                    </FormGroup>
                  </Col>
                )}
                <Col md={{ size: `${haveRole ? 3 : 4}` }}>
                  <FormGroup>
                    <label>Tipo de frete</label>
                    <Input
                      type={"text"}
                      placeholder="Informe aqui"
                      value={orderData.delivery}
                      key="index"
                      disabled
                    >
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label>Condição de pagamento</label>
                    <Input
                      type={"text"}
                      placeholder="Informe aqui"
                      value={orderData.payment}
                      key="index"
                      disabled
                    >
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Transportadora</label>
                    <Input
                      type={"text"}
                      placeholder="Informe aqui"
                      value={orderData.shippingCompany}
                      key="index"
                      disabled
                    >
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Vendedor</label>
                    <Input
                      type={"text"}
                      placeholder="Informe aqui"
                      value={orderData.sellerCompany}
                      key="index"
                      disabled
                    >
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Validade</label>
                    <Input
                      placeholder="Informe aqui"
                      type="text"
                      value={moment(orderData.validated).format("DD/MM/YYYY")}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Peso Liquido</label>
                    <Input
                      placeholder="Informe aqui"
                      type="text"
                      value={orderData.pesoliq}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Peso Bruto</label>
                    <Input
                      placeholder="Informe aqui"
                      type="number"
                      value={orderData.pesobru}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Volumes</label>
                    <Input
                      placeholder="Informe aqui"
                      type="number"
                      value={orderData.volume}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Valor do Frete</label>
                    <Input
                      placeholder="Informe aqui"
                      type="number"
                      value={orderData.valfre}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Ordem de Compra</label>
                    <Input
                      placeholder="Informe aqui"
                      type="char"
                      value={orderData.ordcomp}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Endereço de Entrega</label>
                    <Input
                      placeholder="Informe aqui"
                      type="char"
                      value={orderData.endent}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Empenho</label>
                    <Input
                      placeholder="Informe aqui"
                      type="char"
                      value={orderData.codemp}
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </>
}

export default OrderOnlyReadContainer

