import React, { useState, useEffect } from "react";
import ProductContainer from "../Containers/ProductContainer";
import BudgetTab from "../Tabs/BudgetTab";
import { cloneObject } from "../../helpers/cloneObject";
import moment from "moment";
import getPaymentType from "../../services/paymentType.server";
import getShippingCompany from "../../services/shippingCompany.service";
import { getSellerCompany, getAssistentSellerCompany } from "../../services/sellerCompany.service";
import budgetService from "../../services/budget.service";
import { Notification } from "../../helpers/notification";
import { isHaveRole } from "../../helpers";
import parseRentability from "../../helpers/parseRentability";
import { formatPercentage } from '../../helpers/mask'
// import Select from 'react-select'
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

const BudgetContainer = (props) => {
  const haveRole = isHaveRole("Admin");
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { toggleModal, editDataBudget, isEditMode, clientBudget, getBudgetAndOrderList } = props;
  const [validateInput, setValidateInput] = useState(
    editDataBudget.validated || ""
  );
  const [pesoliqInput, setPesoLiqInput] = useState(
    editDataBudget.pesoliq || ""
  );
  const [pesobruInput, setPesoBruInput] = useState(
    editDataBudget.pesobru || ""
  );
  const [volumeInput, setVolumeInput] = useState(editDataBudget.volume || "");
  const [valfreInput, setValFreInput] = useState(editDataBudget.valfre || "");
  const [ordcompInput, setOrdCompInput] = useState(
    editDataBudget.ordcomp || ""
  );
  const [endentInput, setEndEntInput] = useState(editDataBudget.endent || "");
  const [codempInput, setCodEmpInput] = useState(editDataBudget.codemp || "");

  const [productBudget, setProductBudget] = useState(
    editDataBudget.products || []
  );

  const [productBudget2, setProductBudget2] = useState(
    editDataBudget.products || []
  );


  const [modalProduct, setModalProduct] = useState(false);
  const [typeDelivery, setTypeDelivery] = useState(
    editDataBudget.delivery || ""
  );
  const [paymentType, setPaymentType] = useState([]);
  const [paymentInput, setPaymentInput] = useState(
    editDataBudget.payment || ""
  );
  const [shippingCompany, setShippingCompany] = useState([]);
  const [shippingCompInput, setShippingCompInput] = useState(
    editDataBudget.shippingCompany || ""
  );
  const [sellerCompany, setSellerCompany] = useState([]);
  const [assistentSellerCompany, setAssistentSellerCompany] = useState([]);
  const [sellerCompanyExternalInput, setSellerCompanyExternalInput] = useState(
    (editDataBudget.sellerCompany && editDataBudget.sellerCompany.external) || ""
  );
  const [sellerCompanyInternalInput, setSellerCompanyInternalInput] = useState(
    (editDataBudget.sellerCompany && editDataBudget.sellerCompany.internal) || ""
  );
  const [discountValue, setDiscountValue] = useState('0,00 %')
  const [totalPriceDiscount, setTotalPriceDiscount] = useState(0)

  const replaceDiscountValue = discountValue !== 0 ? String(discountValue).slice(0, 5).replace(',', '.') : '0,00 %'

  useEffect(() => {
    const getPaymentTypeList = async () => {
      if (paymentType.length === 0) {
        const result = await getPaymentType();
        setPaymentType(result);
      }
    };
    getPaymentTypeList();
  });

  useEffect(() => {
    const getShippingCompanyList = async () => {
      if (shippingCompany.length === 0) {
        const result = await getShippingCompany();
        setShippingCompany(result);
      }
    };
    getShippingCompanyList();
  });

  useEffect(() => {
    const getSellerCompanyList = async () => {
      if (sellerCompany.length === 0) {
        const result = await getSellerCompany();
        setSellerCompany(result);
      }
    };
    getSellerCompanyList();
  });

  useEffect(() => {
    const getAssistentSellerCompanyList = async () => {
      if (assistentSellerCompany.length === 0) {
        const result = await getAssistentSellerCompany();
        setAssistentSellerCompany(result);
      }
    };
    getAssistentSellerCompanyList();
  });

  const handleChangeDelivery = (e) => {
    e.preventDefault();
    const deliveryTypeInput = e.target.value;
    setTypeDelivery(deliveryTypeInput);
  };

  const handleChangePayment = (e) => {
    e.preventDefault();
    const paymentTypeInput = e.target.value;
    setPaymentInput(paymentTypeInput);
  };

  const handleValidate = (e) => {
    const dataValidateInput = e.target.value;
    moment(dataValidateInput).format("DD/MM/yyyy"); // a função moment trata apenas conteudo de campo data.
    setValidateInput(dataValidateInput);
  };

  const handlePesoliq = (e) => {
    e.preventDefault();
    const numPesoliqInput = e.target.value;
    setPesoLiqInput(numPesoliqInput);
  };

  const handlePesobru = (e) => {
    e.preventDefault();
    const numPesobruInput = e.target.value;
    setPesoBruInput(numPesobruInput);
  };

  const handleVolume = (e) => {
    e.preventDefault();
    const numVolumeInput = e.target.value;
    setVolumeInput(numVolumeInput);
  };

  const handleValfre = (e) => {
    e.preventDefault();
    const numValfreInput = e.target.value;
    setValFreInput(numValfreInput);
  };

  const handleOrdcomp = (e) => {
    e.preventDefault();
    const charOrdcompInput = e.target.value;
    setOrdCompInput(charOrdcompInput);
  };

  const handleEndent = (e) => {
    e.preventDefault();
    const charEndentInput = e.target.value;
    setEndEntInput(charEndentInput);
  };

  const handleCodeemp = (e) => {
    e.preventDefault();
    const charCodeempInput = e.target.value;
    setCodEmpInput(charCodeempInput);
  };

  const handleChangeShippingCompany = (e) => {
    e.preventDefault();
    const shippingInput = e.target.value;
    shippingCompany.map((value) =>
      value.fantasyName === "" ? value.name : value.fantasyName
    );
    setShippingCompInput(shippingInput);
  };

  const handleChangeSellerCompany = (e, type) => {
    e.preventDefault();
    if (type === "external") {
      const sellerCompanyExternalInput = e.target.value;
      sellerCompany.map((value) => (value.Name === "" ? value.name : ""));
      setSellerCompanyExternalInput(sellerCompanyExternalInput);
    } else {
      const sellerCompanyInternalInput = e.target.value;
      assistentSellerCompany.map((value) => (value.Name === "" ? value.name : ""));
      setSellerCompanyInternalInput(sellerCompanyInternalInput);
    }

  };

  const totalShoppingCart = () => {
    const cloneProductBudget = cloneObject(productBudget);
    let totalCart = 0;
    let mix = 0;
    let totalRentability = 0;
    let totalMixQtd = 0;
    let commissionMix = 0;
    cloneProductBudget.forEach((value, index) => {
      const {
        quantity,
        price,
        customedio,
        commission,
        valLucroliq,
      } = parseRentability(value, clientBudget);
      totalMixQtd += +quantity;
      totalRentability += valLucroliq;
      commissionMix += commission * quantity;
      totalCart += quantity * price
      mix += functionRentability(quantity, price, customedio) * quantity;
    });
    return {
      totalCart,
      mix: mix === 0 ? 0 : String(parseFloat(mix / totalMixQtd).toFixed(2)).replace('.', ','),
      totalRentability,
      commission: commissionMix === 0 ? 0 : commissionMix / totalMixQtd,
    };
  };

  const functionRentability = (quantity, price, customedio) => {
    const totalPrice = quantity * price;
    const totalCusto = quantity * customedio;
    const rentability = ((totalPrice - totalCusto) / totalPrice) * 100;
    return rentability;
  };

  const handleChangeQtdProduct = (e, index) => {
    const cloneProductBudget = cloneObject(productBudget);
    const currentProduct = cloneProductBudget[index];
    const nDivsor = (e.target.value / currentProduct.qtdEmb);

    //if (e.target.value >= currentProduct.qtdEmb && Number.isInteger(nDivsor)){    
    cloneProductBudget[index].quantity = +e.target.value;
    setProductBudget(cloneProductBudget);
    //}else{    
    //  Notification(
    //  "A quantidade digitada "+e.target.value+" fraciona a caixa com "+currentProduct.qtdEmb,
    //  "danger"
    // );
    // cloneProductBudget[index].quantity = +e.target.value;
    // setProductBudget(cloneProductBudget);
    //}   
  };

  const handleChangeSingleValue = (e, index) => {
    const cloneProductBudget = cloneObject(productBudget);
    const cloneProductBudget2 = cloneObject(productBudget2);
    

    let npercent = e.target.value / 100;
    let nvalpercent = 0;
    let nvaldesinput = 0;

    // if(e.target.value !== 0 ) {
    //   localStorage.setItem('blockDiscount', 2)
    // } else if (e.target.value <= 0 ){
    //   localStorage.setItem('blockDiscount', 1)
    // }

    localStorage.setItem('blockDiscount', e.target.value <= 0 ? '0' : e.target.value > 0 ? '2' : '0')
    

    if (e.target.value > 5) {
      Notification(
        "O Valor digitado " + e.target.value.replace(",", ".") + " Não pode ser maior do que 5 ! ",
        "danger"
      );
      e.target.value = 5;
      npercent = e.target.value / 100;
      nvalpercent = 0;
      nvaldesinput = 0;

      nvalpercent = cloneProductBudget[index].price * npercent;
      nvaldesinput = cloneProductBudget[index].price - nvalpercent;

      cloneProductBudget[index].price = nvaldesinput;//e.target.value.includes(",") ? String(e.target.value).replace(",", ".") : e.target.value;
      setProductBudget2(cloneProductBudget);

    } else {

      nvalpercent = cloneProductBudget[index].price * npercent;
      nvaldesinput = cloneProductBudget[index].price - nvalpercent;

      cloneProductBudget[index].price = nvaldesinput;//e.target.value.includes(",") ? String(e.target.value).replace(",", ".") : e.target.value;

      setProductBudget2(cloneProductBudget);
      

    }
  };

  

  const handleChangeSingleValueBlur = (e, index) => {
    const cloneProductBudget = cloneObject(productBudget);
    const currentProduct = cloneProductBudget[index];
    const nDivsor = (currentProduct.quantity / currentProduct.qtdEmb);
    let { previousPrice, commission } = cloneProductBudget[index];
    let valueInputed = e.target.value.includes(",") ? e.target.value.replace(",", ".") : e.target.value;

    if (!(currentProduct.quantity >= currentProduct.qtdEmb && Number.isInteger(nDivsor))) {
      Notification(
        "A quantidade digitada " + currentProduct.quantity + " fraciona a caixa com " + currentProduct.qtdEmb,
        "danger"
      );

    }
    setProductBudget(cloneProductBudget);
  };

  const toastContent = (
    <div>
      <i
        style={{ color: "blue", fontSize: "18px", marginRight: "10px" }}
        className="tim-icons icon-trash-simple"
      />
      Produto Removido
    </div>
  );

  const deleteProduct = (index) => {
    const cloneProductBudget = cloneObject(productBudget);
    cloneProductBudget.splice(index, 1);
    setProductBudget(cloneProductBudget);
    Notification(toastContent, "success");
  };

  const validateBudget = () => {
    if (productBudget.length <= 0) {
      Notification("Não há produtos no orçamento", "danger");
      return true;
    }
    if (!clientBudget.cliente || clientBudget.cliente === "") {
      Notification("Nenhum cliente selecionado", "danger");
      return true;
    }
    if (validateInput === "") {
      Notification("A validade do orçamento não está definida", "danger");
      return true;
    }
    if (typeDelivery === "") {
      Notification("O tipo de frete não está definido", "danger");
      return true;
    }
    if (paymentInput === "") {
      Notification("O tipo de pagamento não está definido", "danger");
      return true;
    }
    return false;
  };

  const insertBudgetList = async () => {
    if (validateBudget()) return;
    let isBlocked = false;
    const cloneProductBudget = productBudget.map((item) => {
      if (item.blocked) {
        isBlocked = true;
        delete item.blocked;
      }
      return item;
    });
    const cloneClientSelectedConfirmed = cloneObject(clientBudget);
    const rowBudgetList = {
      client: cloneClientSelectedConfirmed,
      products: cloneProductBudget,
      total: totalShoppingCart(),
      validated: validateInput,
      status: [{ status: isBlocked ? "blocked" : "pending", date: Date.now() }],
      delivery: typeDelivery,
      payment: paymentInput, // trazer o codigo
      shippingCompany: shippingCompInput, // trazer o codigo
      sellerCompany: { internal: sellerCompanyInternalInput, external: sellerCompanyExternalInput }, //trazer o codigo
      pesoliq: pesoliqInput,
      pesobru: pesobruInput,
      volume: volumeInput,
      valfre: valfreInput,
      ordcomp: ordcompInput,
      endent: endentInput,
      codemp: codempInput,
    };

    if (editDataBudget.id) {
      rowBudgetList.id = editDataBudget.id
    } else {
      rowBudgetList.operatorEmail = userData.email;
    }

    const contentSaveBudget = (
      <div>
        <i
          style={{ fontSize: "18px", marginRight: "10px" }}
          className="tim-icons icon-check-2"
        />
        Orçamento criado com sucesso
      </div>
    );

    const saveBudget = isEditMode
      ? await budgetService.put({ ...rowBudgetList, _id: editDataBudget._id })
      : await budgetService.post(rowBudgetList);
    if (saveBudget.error) {
      alert("Tivemos um problema para gravar o orçamento. tente novamente!");
    } else {
      Notification(contentSaveBudget, "success");
      getBudgetAndOrderList();
    }
    toggleModal();
  };

  const toggleModalProduct = () => {
    if (clientBudget.length !== 0 && clientBudget.tabelaproduto !== "")
      setModalProduct(!modalProduct);
    else if (clientBudget.length === 0 && clientBudget.tabelaproduto !== "")
      Notification("Por favor selecione um cliente", "danger");
    else Notification("Cliente sem tabela de Vendas", "danger");
  };

  const auxParseRentability = (data) => {
    return parseRentability(data, clientBudget);
  };

  // const totalWithDiscount = () => {
  //   if (replaceDiscountValue !== 0) {
  //     setTotalPriceDiscount(totalShoppingCart().totalCart - replaceDiscountValue * totalShoppingCart().totalCart / 100)
  //   } else {
  //     setTotalPriceDiscount(totalShoppingCart().totalCart)
  //   }
  // }

  const totalWithDiscount = replaceDiscountValue !== '0,00 %' ? totalShoppingCart().totalCart - replaceDiscountValue * totalShoppingCart().totalCart / 100 
  : totalShoppingCart().totalCart

    const blockTotalPriceDiscount = localStorage.getItem('blockDiscount') === '2' ? true : false 


  return (
    <>
      <Modal isOpen={modalProduct} className="modal-budget">
        <ModalHeader toggle={toggleModalProduct}>Adicionar Produto</ModalHeader>
        <ModalBody>
          <ProductContainer
            auxParseRentability={auxParseRentability}
            productTable={clientBudget.tabelaproduto}
            setProductBudget={setProductBudget}
            functionRentability={functionRentability}
            deleteProduct={deleteProduct}
            productBudget={productBudget}
          />
        </ModalBody>
      </Modal>
      <Row>
        <BudgetTab
          productBudget={productBudget2.length === 0 ? productBudget : productBudget2}
          handleChangeSingleValueBlur={handleChangeSingleValueBlur}
          handleChangeQtdProduct={handleChangeQtdProduct}
          handleChangeSingleValue={handleChangeSingleValue}
          deleteProduct={deleteProduct}
          toggleModalProduct={toggleModalProduct}
          clientSelectedConfirmed={clientBudget}
          functionRentability={functionRentability}
        />
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Form>
                <Row>
                  <Col md="2">
                    <FormGroup>
                      <label>Desconto</label>
                      <Input
                        type="text"
                        onChange={(e) => {
                          setDiscountValue(formatPercentage(e.target.value))
                          localStorage.setItem('blockDiscount', e.target.value <= 0 ? '0' : e.target.value > 0 ? '1' : '0')
                        }}
                        value={discountValue}
                        defaultValue={discountValue}
                        disabled={blockTotalPriceDiscount}
                      //   .replace(/\D/g, "")
                      //   .replace(/(\d+)(\d{2})/, "$1,$2")
                      //   .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                      //   .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                      //   .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3")
                      //   }`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={{ size: `${haveRole ? 3 : 3}` }}>
                    <FormGroup>
                      <label>Total Geral</label>
                      <Input
                        onChange={() => false}
                        type="text"
                        value={`R$ ${String(totalWithDiscount.toFixed(2))
                          .replace(/\D/g, "")
                          .replace(/(\d+)(\d{2})/, "$1,$2")
                          .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                          .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                          .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3")
                          }`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label>Tipo de frete</label>
                      <Input
                        type={"select"}
                        placeholder="Informe aqui"
                        onChange={handleChangeDelivery}
                        value={typeDelivery}
                        key="index"
                      >
                        <option value=""></option>
                        <option value="FOB">FOB</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Vendedor/Representante</label>
                      <Input
                        type={"select"}
                        placeholder="Informe aqui"
                        onChange={(e) => handleChangeSellerCompany(e, "external")}
                        value={sellerCompanyExternalInput}
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
                      <label>Condição de pagamento</label>
                      <Input
                        type={"select"}
                        placeholder="Informe aqui"
                        onChange={handleChangePayment}
                        value={paymentInput}
                        key="index"
                      >
                        <option></option>
                        {paymentType.map((value, index) => (
                          <option value={value.code} key={index}>
                            {value.description}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Transportadora</label>
                      <Input
                        type={"select"}
                        placeholder="Informe aqui"
                        onChange={handleChangeShippingCompany}
                        value={shippingCompInput}
                        key="index"
                      >
                        <option></option>
                        {shippingCompany.map((value, index) => (
                          <option value={value.code} key={index}>
                            {value.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label>Validade</label>
                      <Input
                        placeholder="Informe aqui"
                        type="date"
                        onChange={handleValidate}
                        value={validateInput}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <label>Observações </label>
                      <textarea
                        rows="7"
                        cols="70"
                        placeholder="Informe aqui"
                        type="char"
                        onChange={handleCodeemp}
                        value={codempInput}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={{ size: 2, offset: 8 }}>
                    <Button
                      style={{ width: "100%", marginTop: "28px" }}
                      className="btn-fill"
                      color="warning"
                      type="button"
                      onClick={toggleModal}
                    >
                      Cancelar
                    </Button>
                  </Col>
                  <Col md="2">
                    <Button
                      style={{ width: "100%", marginTop: "28px" }}
                      className="btn-fill"
                      color="primary"
                      type="button"
                      onClick={insertBudgetList}
                    >
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
  );
};

export default BudgetContainer;