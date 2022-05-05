import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formatCep, onlyLetters, maskEmail, onlyNumbers, formatPhone } from 'helpers/mask';
import {
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button
} from "reactstrap";

const SignupClientTable = (props) => {

  const { register, setValue, getValues, handleSubmit } = useForm()

  const [formFull, setFormFull] = useState()
  const [endereco, setEndereco] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [cnpj, setCnpj] = useState('')

  console.log(bairro, 'bairro')

  console.log(formFull, 'formFull')

  const handleCep = (e) => {
    const { value } = e.target
    console.log(value, 'valuecep')
    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setBairro(data.bairro)
        setValue('bairro', data.bairro)
        setEndereco(data.logradouro)
        setValue('endereco', data.logradouro)
        setCidade(data.localidade)
        setValue('cidade', data.localidade)
        setEstado(data.uf)
        setValue('estado', data.uf)
        console.log(data)

      })
  }

//   const axios = require("axios");

// useEffect(() => {

//   const options = {
//     method: 'GET',
//     url: `https://consulta-cnpj-gratis.p.rapidapi.com/office/${cnpj}`,
//     params: {simples: 'false'},
//     headers: {
//       'X-RapidAPI-Host': 'consulta-cnpj-gratis.p.rapidapi.com',
//       'X-RapidAPI-Key': '47698fad2bmshc96ec49a3688bc8p18703cjsn1f7515fd1d5d'
//     }
//   };

//   axios.request(options).then(function (response) {
//     console.log(response.data.address);
//     setBairro(response.data.address.district)
//   }).catch(function (error) {
//     console.error(error);
//   });
// })

  const handleSignup = () => {
    setFormFull(getValues())
  }

  return <>
    <Form onSubmit={handleSubmit(handleSubmit)}>
      <Row>
        <Col md="4">
          <FormGroup>
            <label>Nome completo</label>
            <Input
              {...register("nome")}
              id="nome"
              name="nome"
              onChange={(e) => setValue('nome', e.target.value)}
              type="text"
              placeholder="Nome Completo">
            </Input>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <label>CPF</label>
            <Input
              {...register("cpf")}
              id="cpf"
              name="cpf"
              onBlur={(e) => setCnpj(e.target.value)}
                onChange={(e) => setValue('cpf', e.target.value)}
              type="text"
              placeholder="CPF">
            </Input>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <label>
              E-mail
            </label>
            <Input
              {...register("email")}
              id="email"
              name="email"
              onChange={(e) => setValue('email', e.target.value)}
              type="text"
              placeholder="Email">
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>        
        <Col md="3">
          <FormGroup>
            <label>CEP</label>
            <Input
              {...register("CEP")}
              id="CEP"
              name="CEP"
              onBlur={handleCep}
              maxLength={9}
              onChange={(e) => setValue('CEP', formatCep(e.target.value))}
              autoFocus
              autoComplete='autocompleteOff'
              type="text"
              placeholder="CEP">
            </Input>
          </FormGroup>
        </Col>

        <Col md="5">
          <FormGroup>
            <label>
              Endereço
            </label>
            <Input
              {...register("endereco")}
              id="endereco"
              name="endereco"
              // onChange={(e) => setValue('endereco', e.target.value)}
              type="text"
              value={endereco}
              placeholder="Endereço">
            </Input>
          </FormGroup>
        </Col>
        <Col md="1">
          <FormGroup>
            <label>
              Número
            </label>
            <Input
              {...register("numero")}
              id="numero"
              name="numero"
              onChange={(e) => setValue('numero', e.target.value)}
              type="text"
              placeholder="Número">
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <label>
              Bairro
            </label>
            <Input
              {...register("bairro")}
              id="bairro"
              name="bairro"
              // onChange={(e) => setValue('bairro', e.target.value)}
              type="text"
              value={bairro}
              placeholder="Bairro">
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>        
        <Col md="4">
          <FormGroup>
            <label>Cidade</label>
            <Input
              {...register("cidade")}
              id="cidade"
              name="cidade"
              // onChange={(e) => setValue('cidade', e.target.value)}
              type="text"
              value={cidade}
              placeholder="Cidade">
            </Input>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <label>
              Estado
            </label>
            <Input
              {...register("estado")}
              id="estado"
              name="estado"
              // onChange={(e) => setValue('estado', e.target.value)}
              type="text"
              value={estado}
              placeholder="Estado">
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <label>
              Telefone
            </label>
            <Input
              {...register("telefone")}
              id="telefone"
              name="telefone"
              onChange={(e) => setValue('telefone', formatPhone(e.target.value))}
              type="text"
              placeholder="Telefone">
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <label>
              Vendedor
            </label>
            <Input
              {...register("vendedor")}
              id="vendedor"
              name="vendedor"
              onChange={(e) => setValue('vendedor', e.target.value)}
              type="select"
              placeholder="Vendedor">
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <FormGroup>
            <label>Senha</label>
            <Input
              {...register("senha")}
              id="senha"
              name="senha"
              onChange={(e) => setValue('senha', e.target.value)}
              type="text"
              placeholder="Senha">
            </Input>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <label>Confirmar senha</label>
            <Input
              {...register("senha2")}
              id="senha2"
              name="senha2"
              onBlur={(e) => setCnpj(e.target.value)}
              onChange={(e) => setValue('senha2', e.target.value)}
              type="text"
              placeholder="Confirmar senha">
            </Input>
          </FormGroup>
        </Col>
      </Row>      
      <Row>
        <Col md={{ size: 2, offset: 10 }}>
          <Button
            style={{ width: "100%", marginTop: "28px" }}
            onClick={handleSignup}
            className="btn-fill"
            color="primary"
            type="button"
          >
            Cadastrar
          </Button>
        </Col>
      </Row>
    </Form>
  </>
}

export default SignupClientTable