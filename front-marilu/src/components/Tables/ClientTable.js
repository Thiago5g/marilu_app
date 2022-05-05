import React from 'react'
import {
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";

const ClientTable = (props) => {
  
  const {clientSelectedConfirmed} = props

  return <>
    <Row>
    <Col md="2">
        <FormGroup>
          <label>Código</label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.cod}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="5">
        <FormGroup>
          <label>Razão Social</label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.cliente}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="5">
        <FormGroup>
          <label>Nome Fantasia</label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.nomeFantasia}>
          </Input>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md="3">
        <FormGroup>
          <label>CPF ou CNPJ</label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.cnpjoucpf ? clientSelectedConfirmed.cnpjoucpf.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : ''}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup>
          <label>
          Inscrição Estadual
        </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.inscr ? clientSelectedConfirmed.inscr.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})/, "$1.$2.$3.$4") : ''}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <label>            
            Endereço
            </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.endereco}>
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
            type="text"
            defaultValue={clientSelectedConfirmed.bairro}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup>
          <label>Cidade</label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.cidade}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="1">
        <FormGroup>
          <label>
            Estado
        </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.estado}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="2">
        <FormGroup>
          <label>
            CEP
        </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.cep ? clientSelectedConfirmed.cep.replace(/^(\d{5})(\d{3})/, "$1-$2") : ''}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="1">
        <FormGroup>
          <label>
            DDD
        </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.ddd ? clientSelectedConfirmed.ddd.replace(/^(\d{4})(\d{4})/, "$1-$2") : ''}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="2">
        <FormGroup>
          <label>
            Telefone
        </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.telefone}>
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
            type="text"
            defaultValue={clientSelectedConfirmed.email}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup>
          <label>
            Responsável
        </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.vendedor}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup>
          <label>
            Cargo
        </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.cargo}>
          </Input>
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup>
          <label>
            Contato
        </label>
          <Input
            type="text"
            defaultValue={clientSelectedConfirmed.contato}>
          </Input>
        </FormGroup>
      </Col>
    </Row>
  </>
}

export default ClientTable