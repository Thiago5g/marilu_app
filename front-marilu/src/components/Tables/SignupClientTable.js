import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formatCep, onlyLetters, maskEmail, onlyNumbers, formatPhone } from 'helpers/mask';
import signupClientService from '../../services/signupClient.service'
import { Notification } from "../../helpers/notification";

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

  const signupNewClient = async () => {

    setFormFull(getValues())

    const newClientData = {
      razaosocial: formFull?.razaoSocial,
      nomefantasia: formFull?.nomeFantasia,
      cpfoucnpj: formFull?.CPFouCNPJ,
      inscricao: formFull?.inscricaoEstadual,
      cep: formFull?.CEP,
      endereco: formFull?.endereco,
      numero: formFull?.numero,
      bairro: formFull?.bairro,
      cidade: formFull?.cidade,
      estado: formFull?.estado,
      telefone: formFull?.telefone,
      email: formFull?.email,
      representante: formFull?.responsavel
    };
    console.log(newClientData, 'newClientData')

    const contentSaveClient = (
      <div>
        <i
          style={{ fontSize: "18px", marginRight: "10px" }}
          className="tim-icons icon-check-2"
        />
        Cadastro feito com sucesso
      </div>
    );

    const saveClient = await signupClientService.post(newClientData);
    if (signupClientService.error) {
      alert("Tivemos um problema para cadastrar usuario. tente novamente!");
    } else {
      Notification(contentSaveClient, "success");
    }
  };

  console.log(formFull?.razaoSocial, 'social')

  // const handleSignup = () => {
  //   setFormFull(getValues())
  //   signupNewClient()
  // }

  return <>
    <Form onSubmit={handleSubmit(handleSubmit)}>
      <Row>
        <Col md="5">
          <FormGroup>
            <label>Raz??o Social</label>
            <Input
              {...register("razaoSocial")}
              id="razaoSocial"
              name="razaoSocial"
              onChange={(e) => setValue('razaoSocial', e.target.value)}
              type="text"
              placeholder="Raz??o Social">
            </Input>
          </FormGroup>
        </Col>
        <Col md="5">
          <FormGroup>
            <label>Nome Fantasia</label>
            <Input
              {...register("nomeFantasia")}
              id="nomeFantasia"
              name="nomeFantasia"
              onChange={(e) => setValue('nomeFantasia', e.target.value)}
              type="text"
              placeholder="Nome Fantasia">
            </Input>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <label>CPF ou CNPJ</label>
            <Input
              {...register("CPFouCNPJ")}
              id="CPFouCNPJ"
              name="CPFouCNPJ"
              onBlur={(e) => setCnpj(e.target.value)}
              onChange={(e) => setValue('CPFouCNPJ', e.target.value)}
              type="text"
              placeholder="CPF ou CNPJ">
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <FormGroup>
            <label>
              Inscri????o Estadual
            </label>
            <Input
              {...register("inscricaoEstadual")}
              id="inscricaoEstadual"
              name="inscricaoEstadual"
              onChange={(e) => setValue('inscricaoEstadual', e.target.value)}
              type="text"
              placeholder="Inscri????o Estadual">
            </Input>
          </FormGroup>
        </Col>
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
              Endere??o
            </label>
            <Input
              {...register("endereco")}
              id="endereco"
              name="endereco"
              // onChange={(e) => setValue('endereco', e.target.value)}
              type="text"
              value={endereco}
              placeholder="Endere??o">
            </Input>
          </FormGroup>
        </Col>
        <Col md="1">
          <FormGroup>
            <label>
              N??mero
            </label>
            <Input
              {...register("numero")}
              id="numero"
              name="numero"
              onChange={(e) => setValue('numero', e.target.value)}
              type="text"
              placeholder="N??mero">
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
      </Row>
      <Row>
        <Col md="3">
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
        <Col md="3">
          <FormGroup>
            <label>
              Respons??vel
            </label>
            <Input
              {...register("responsavel")}
              id="responsavel"
              name="responsavel"
              onChange={(e) => setValue('responsavel', e.target.value)}
              type="text"
              placeholder="Respons??vel">
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <label>
              Cargo
            </label>
            <Input
              {...register("cargo")}
              id="cargo"
              name="cargo"
              onChange={(e) => setValue('cargo', e.target.value)}
              type="text"
              placeholder="Cargo">
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <label>
              Contato
            </label>
            <Input
              {...register("contato")}
              id="contato"
              name="contato"
              onChange={(e) => setValue('contato', e.target.value)}
              type="text"
              placeholder="Contato">
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 2, offset: 10 }}>
          <Button
            style={{ width: "100%", marginTop: "28px" }}
            onClick={signupNewClient}
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