import React, { useState, useEffect } from "react";
import ClientTable from "../Tables/ClientTable";
import { cloneObject } from "../../helpers/cloneObject";
import Select from "react-select";

import getClients from "../../services/client.service";
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
  Collapse,
} from "reactstrap";

const ClientContainer = (props) => {
  const {
    setClientBudget,
    clientBudget,
    toggleModal,
    setClienteSelectedConfirmed,
    clientSelectedConfirmed,
    getBudgetAndOrderList,
    setBudgetList,
    setOrderList,
  } = props;
  const [clientSelected, setClientSeleted] = useState(clientBudget || []);
  // const [citySelect, setCitySelect] = useState([])
  const [isOpen, setIsOpen] = useState(true);
  const [clients, setClients] = useState([]);
  const [optionsCity, setOptionsCity] = useState([]);
  const [optionsCod, setOptionsCod] = useState([]);
  const [optionsClient, setOptionsClient] = useState([]);
  const [optionsCnpjOuCpf, setOptionsCnpjOuCpf] = useState([]);
  const [dynamicClients, setDynamicClients] = useState([]);

  useEffect(() => {
    const getClientList = async () => {
      if (clients.length === 0) {
        const result = await getClients();
        setClients(result);
        setDynamicClients(result);
        const arrayCity = [];
        const optionArrayCity = [];
        result.map((value, index) => {
          if (!arrayCity.includes(value.cidade)) {
            arrayCity.push(value.cidade);
            optionArrayCity.push({ value: value.cidade, label: value.cidade });
          }
          return false;
        });
        setOptionsCity(optionArrayCity);
      }
    };
    getClientList();
  });

  useEffect(() => {
    const getCities = () => {
      const optionArrayCod = [];
      const optionArrayClient = [];
      const optionArrayCnpjOuCpf = [];
      dynamicClients.map((value, index) => {
        optionArrayCod.push({ value: value.cod, label: value.cod });
        optionArrayClient.push({ value: value.cliente, label: value.cliente });
        optionArrayCnpjOuCpf.push({
          value: value.cnpjoucpf,
          label: value.cnpjoucpf,
        });
        return null;
      });
      setOptionsCod(optionArrayCod);
      setOptionsClient(optionArrayClient);
      setOptionsCnpjOuCpf(optionArrayCnpjOuCpf);
    };
    getCities();
  }, [dynamicClients]);

  const handleSelectCity = (inputValue) => {
    const { value } = inputValue;
    getDataClients(value, "cidade");
  };

  const handleCodSelect = (inputValue) => {
    const { value } = inputValue;
    const client = findDataClient(value, "cod");
    setClientSeleted(client[0]);
  };

  const handleClientSelect = (inputValue, { action }, e) => {
    const { value } = inputValue;
    const client = findDataClient(value, "cliente");
    setClientSeleted(client[0]);
  };

  const handleCnpjOuCpfSelect = (inputValue) => {
    const { value } = inputValue;
    const client = findDataClient(value, "cnpjoucpf");
    setClientSeleted(client[0]);
  };

  const getDataClients = (value, type) => {
    const clientsSelected = clients.filter((row) => row.cidade === value);
    setDynamicClients(clientsSelected);
  };

  const findDataClient = (value, type) => {
    const clientSelected = clients.filter((client) => client[type] === value);
    return clientSelected;
  };

  const buttonConfirmed = () => {
    const clientConfirmed = cloneObject(clientSelected);
    setClientBudget(clientConfirmed);
    setClienteSelectedConfirmed(clientConfirmed);
    setBudgetList([]);
    setOrderList([]);
  };  

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Dados do Cliente</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <label>Cidade</label>
                    <Select
                      options={optionsCity}
                      onChange={handleSelectCity}
                      onInputChange={clientSelected.cidade}
                    />
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <label>Cod.</label>
                    <Select
                      options={optionsCod}
                      onChange={handleCodSelect}
                      defaultValue={clientSelected.cod}
                      onInputChange={clientSelected.cod}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Nome do Cliente</label>
                    <Select
                      options={optionsClient}
                      onChange={handleClientSelect}
                      defaultValue={clientSelected.cliente}
                      onInputChange={clientSelected.cliente}
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <label>CNPJ ou CPF</label>
                    <Select
                      options={optionsCnpjOuCpf}
                      onChange={handleCnpjOuCpfSelect}
                      onInputChange={clientSelected.cnpjoucpf}
                    />
                  </FormGroup>
                </Col>
                <Col md={{ size: 2, offset: 10 }}>
                  <Button
                    style={{ width: "100%", marginTop: "28px" }}
                    onClick={buttonConfirmed}
                    className="btn-fill"
                    color="primary"
                    type="button"
                  >
                    Selecionar
                  </Button>
                </Col>
                <Col md="12">
                  <Row>
                    <Col md="11">
                      <hr></hr>
                    </Col>
                    <Col style={{ textAlign: "right" }} md="1">
                      {isOpen ? (
                        <i
                          style={{ cursor: "pointer" }}
                          className="tim-icons icon-minimal-up"
                          onClick={() => setIsOpen(false)}
                        />
                      ) : (
                        <i
                          style={{ cursor: "pointer" }}
                          className="tim-icons icon-minimal-down"
                          onClick={() => setIsOpen(true)}
                        />
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col md="12">
                  <Collapse isOpen={isOpen}>
                    <ClientTable
                      clientSelectedConfirmed={clientSelectedConfirmed}
                    />

                    <Row>
                      <Col md={{ size: 3, offset: 6 }}>
                        <Button
                          style={{ width: "100%" }}
                          disabled={!clientSelectedConfirmed.cod}
                          className="btn-fill"
                          color="primary"
                          type="button"
                          onClick={getBudgetAndOrderList}
                        >
                          Buscar
                        </Button>
                      </Col>
                      <Col md="3">
                        <Button
                          style={{ width: "100%" }}
                          disabled={!clientSelectedConfirmed.cod}
                          className="btn-fill"
                          color="primary"
                          type="button"
                          onClick={toggleModal}
                        >
                          Novo
                        </Button>
                      </Col>
                    </Row>
                  </Collapse>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ClientContainer;
