import React, { useState, useEffect } from "react";
import BudgetContainer from "../components/Containers/BudgetContainer";
import OrderOnlyReadContainer from "../components/Containers/OrderOnlyReadContainer";
import SalesTab from "../components/Tabs/SalesTab";
import budgetService from "../services/budget.service";
import ClientContainer from "../components/Containers/ClientContainer";
import orderService from "../services/order.service";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

function Sales() {
  const [clientBudget, setClientBudget] = useState([]);
  const [clientSelectedConfirmed, setClienteSelectedConfirmed] = useState({});
  const [modal, setModal] = useState(false);
  const [modalRead, setModalRead] = useState(false);
  const [budgetList, setBudgetList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderSelected, setOrderSelected] = useState({});
  const [editDataBudget, setEditDataBudget] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setClientBudget(editDataBudget.client || []);
  }, [editDataBudget]);

  const toggleModal = () => {
      localStorage.setItem('blockDiscount', 0)
      setModal(!modal) 
  };

  const getBudgetAndOrderList = async () => {
    const budgetListResult = await budgetService.get(clientSelectedConfirmed.cnpjoucpf);
    setBudgetList(budgetListResult);
    const orderListResult = await orderService.get(clientSelectedConfirmed.cnpjoucpf);
    setOrderList(orderListResult);
  };

  const toggleModalRead = () => setModalRead(!modalRead);

  const readOnlyOrder = (data) => {
    toggleModalRead();
    setOrderSelected(data);
  };

  return (
    <>
      <Modal isOpen={modal} className="modal-budget">
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? "Editar" : "Criar"} Orçamento
        </ModalHeader>
        <ModalBody>
          <BudgetContainer
            toggleModal={toggleModal}
            getBudgetAndOrderList={getBudgetAndOrderList}
            editDataBudget={editDataBudget}
            isEditMode={isEditMode}
            budgetList={budgetList}
            clientBudget={clientBudget}
          />
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalRead}
        toggle={toggleModalRead}
        className="modal-budget"
      >
        <ModalHeader toggle={toggleModalRead}>
          Detalhes do orçamento
        </ModalHeader>
        <ModalBody>
          <OrderOnlyReadContainer
            toggleModalRead={toggleModalRead}
            orderData={orderSelected}
          />
        </ModalBody>
      </Modal>
      <div className="content">
        <ClientContainer
          setClienteSelectedConfirmed={setClienteSelectedConfirmed}
          clientSelectedConfirmed={clientSelectedConfirmed}
          setClientBudget={setClientBudget}
          clientBudget={clientBudget}
          toggleModal={toggleModal}
          getBudgetAndOrderList={getBudgetAndOrderList}
          setBudgetList={setBudgetList}
          setOrderList={setOrderList}
        />
        { clientSelectedConfirmed.cod && (budgetList.length > 0 || orderList.length > 0) ? <SalesTab
          clientSelectedConfirmed={clientSelectedConfirmed}
          setIsEditMode={setIsEditMode}
          toggleModal={toggleModal}
          setEditDataBudget={setEditDataBudget}
          getBudgetAndOrderList={getBudgetAndOrderList}
          budgetList={budgetList}
          orderList={orderList}
          readOnlyOrder={readOnlyOrder}
        /> : <h4 style={{textAlign: 'center', marginTop: 50}}>Nenhuma busca solicitada.</h4> }
      </div>
    </>
  );
}

export default Sales;
