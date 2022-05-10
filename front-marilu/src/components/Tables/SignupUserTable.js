import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import signupUserService from '../../services/signupUser.service'
import { Notification } from "../../helpers/notification";
import { formatCpf, formatPhone, isPhoneValid, isEmailValid, formatCep } from '../../helpers/mask'
import { getSellerCompany } from "../../services/sellerCompany.service";
import Select from "react-select";
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
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [sellerCompany, setSellerCompany] = useState([])

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

  const signupNewUser = async () => {

    setFormFull(getValues())

    const newUserData = {
      nome: formFull?.nome,
      cpf: formFull?.cpf,
      cep: formFull?.CEP,
      endereco: formFull?.endereco,
      numero: formFull?.numero,
      bairro: formFull?.bairro,
      cidade: formFull?.cidade,
      estado: formFull?.estado,
      telefone: formFull?.telefone,
      vendedor: formFull?.vendedor,
      email: formFull?.email,
      senha: formFull?.senha,
      senha2: formFull?.senha2
    };
    console.log(newUserData, 'newUserData')

    const contentSaveUser = (
      <div>
        <i
          style={{ fontSize: "18px", marginRight: "10px" }}
          className="tim-icons icon-check-2"
        />
        Cadastro feito com sucesso
      </div>
    );

    const saveClient = await signupUserService.post(newUserData);
    if (signupUserService.error) {
      alert("Tivemos um problema para cadastrar usuario. tente novamente!");
    } else {
      Notification(contentSaveUser, "success");
    }
  };

  console.log(formFull?.razaoSocial, 'social')

  const handlePasswordVisibility = () => setPasswordVisibility(!passwordVisibility)

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

  const optionAdm = [
    { value: 1, label: 'Não' },
    { value: 2, label: 'Sim' }
  ]

  useEffect(() => {
    const getSellerCompanyList = async () => {
      if (sellerCompany.length === 0) {
        const result = await getSellerCompany();
        setSellerCompany(result);
      }
    };
    getSellerCompanyList();
  });

  // const optionSellerCompanyCode = sellerCompany?.map((value) => value.code)
  // const optionSellerCompanyName = sellerCompany?.map((value) => value.name)

  // const optionSellerCompanyData = sellerCompany.map(value => {
  //   return (
  //     value: value.code,
  //     label: value.name
  //   (
  // }


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
              maxLength={14}
              onBlur={(e) => setCnpj(e.target.value)}
              onChange={(e) => setValue('cpf', e.target.value
                .replace(/\D/g, '')
                .replace(/[^0-9]/g, "")
                .replace(/(\d{5})(\d{3})/, '$1-$2'))}
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
              onChange={(e) => setValue('CEP', e.target.value)}
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
              type={"select"}
              placeholder="Vendedor"
              onChange={(e) => setValue('vendedor', e.target.value)}
              // value={sellerCompanyExternalInput}
              key="index"
            >
              <option></option>
              {sellerCompany.map((value, index) => (
                <option value={value.code} key={index}>
                  {value.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <FormGroup>
            <label>Senha</label>
            <span
              onClick={handlePasswordVisibility}
              style={{ cursor: 'pointer', position: 'absolute', zIndex: 10, marginTop: 34, marginLeft: 440 }}>
              {passwordVisibility ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
            </span>
            <Input
              {...register("senha")}
              id="senha"
              name="senha"
              onChange={(e) => setValue('senha', e.target.value)}
              type={passwordVisibility ? "text" : "password"}
              placeholder="Senha">

            </Input>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <label>Confirmar senha</label>
            <span
              onClick={handlePasswordVisibility}
              style={{ cursor: 'pointer', position: 'absolute', zIndex: 10, marginTop: 34, marginLeft: 375 }}>
              {passwordVisibility ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
            </span>
            <Input
              {...register("senha2")}
              id="senha2"
              name="senha2"
              onBlur={(e) => setCnpj(e.target.value)}
              onChange={(e) => setValue('senha2', e.target.value)}
              type={passwordVisibility ? "text" : "password"}
              placeholder="Confirmar senha">
            </Input>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <label>Administrador:</label>
            <Input
              {...register("role")}
              id="role"
              name="role"
              type={"select"}
              placeholder="Selecione"
              onChange={(e) => setValue('role', e.target.value)}
              // value={sellerCompanyExternalInput}
              key="index"
            >
              <option></option>
              <option value={1}>Não</option>
              <option value={2}>Sim</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 2, offset: 10 }}>
          <Button
            style={{ width: "100%", marginTop: "28px" }}
            onClick={signupNewUser}
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