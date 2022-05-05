import React, { useState, useEffect } from 'react'
import ClientContainer from '../Containers/ClientContainer'
import ProductContainer from '../Containers/ProductContainer'


import {
    Card,
    CardBody,
    Button,
    Row,
    Col,
    FormGroup,
    Form,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";

const OrderContainer = (props) => {   

    const ClientTable = (props) => {

        const { clientSelectedConfirmed } = props

        return <>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Dados do Cliente</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="2">
                                    <FormGroup>
                                        <label>Código</label>
                                        <Input
                                            defaultValue=""
                                            type="text"
                                            value={clientSelectedConfirmed.cod}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="5">
                                    <FormGroup>
                                        <label>Razão Social</label>
                                        <Input
                                            defaultValue=""
                                            type="text"
                                            value={clientSelectedConfirmed.cliente}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="5">
                                    <FormGroup>
                                        <label>Nome Fantasia</label>
                                        <Input
                                            defaultValue=""
                                            type="text"
                                            value={clientSelectedConfirmed.nomeFantasia}>
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
                                            value={clientSelectedConfirmed.cnpjoucpf}>
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
                                            value={clientSelectedConfirmed.inscr}>
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
                                            value={clientSelectedConfirmed.endereco}>
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
                                            value={clientSelectedConfirmed.bairro}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <label>Cidade</label>
                                        <Input
                                            defaultValue=""
                                            type="text"
                                            value={clientSelectedConfirmed.cidade}>
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
                                            value={clientSelectedConfirmed.estado}>
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
                                            value={clientSelectedConfirmed.cep}>
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
                                            value={clientSelectedConfirmed.ddd}>
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
                                            value={clientSelectedConfirmed.telefone}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <label>
                                            Responsável
                                         </label>
                                        <Input
                                            defaultValue=""
                                            type="text"
                                            value={clientSelectedConfirmed.vendedor}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label>
                                            Cargo
                                         </label>
                                        <Input
                                            defaultValue=""
                                            type="text"
                                            value={clientSelectedConfirmed.cargo}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label>
                                            Contato
                                         </label>
                                        <Input
                                            defaultValue=""
                                            type="text"
                                            value={clientSelectedConfirmed.contato}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    }

    const ProductTable = (props) => {

        const { productList, insertProduct } = props

        return <Table className="tablesorter" responsive>
            <thead className="text-primary">
                <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Unidade</th>
                    {/* <th>Preço Unitário</th> */}
                    {/* <th>Marca</th> */}
                    <th className="text-center">Ação</th>
                </tr>
            </thead>
            <tbody>
                {productList.map((value, index) => {
                    return (<tr key={index} >
                        <td>{value.code}</td>
                        <td>{value.description}</td>
                        <td>{value.unity}</td>
                        {/* <td></td> */}
                        {/* <td></td> */}
                        <td className="text-center">
                            <i style={{ cursor: 'pointer' }} title="Adicionar" onClick={() => insertProduct(index)} className="tim-icons icon-cart" />
                        </td>
                    </tr>)
                })}
            </tbody>
        </Table >
    }

    return <>
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
                                            Rentabilidade Real
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
                                            type="text"
                                            value={selectedDate}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <FormGroup>
                                        <label>Tipo de frete</label>
                                        <Input
                                            type="text"
                                            defaultValue=""
                                            placeholder="Informe aqui"
                                            value={selectedTypeDelivery}
                                        >
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
                                            value={selectedPaymentType}>
                                            <option></option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 2, offset: 6 }}>
                                    <Button style={{ width: '100%', marginTop: '28px' }}
                                        className="btn-fill"
                                        color="warning"
                                        type="button"
                                        onClick={toggleModal}>
                                        Fechar
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