import React, { useState } from 'react'
import BudgetTable from '../Tables/BudgetTable'
import OrderTable from '../Tables/OrderTable'
import { ContainerTab } from '../../assets/custom/tab-style-container'
import budgetService from '../../services/budget.service'
import orderService from '../../services/order.service'
import { Notification } from '../../helpers/notification'
import { isHaveRole } from "../../helpers"
import moment from "moment"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

const SalesTab = (props) => {

  const [activeTab, setActiveTab] = useState('1');

  const { readOnlyOrder, toggleModal, orderList, readOnlyBudget, validateInput, budgetList, setEditDataBudget, setIsEditMode, clientSelectedConfirmed, getBudgetAndOrderList } = props

  const approveBudget = async (data) => {
    if (window.confirm('Confirma a aprovação deste orçamento?')) {
      const result = await budgetService.approve(data)
      if (result.error) {
        Notification('Não foi possível aprovar este orçamemto!', 'danger')
      } else {
        Notification('Orçamento aprovado', 'success')
        getBudgetAndOrderList()
      }
    }
    return
  }

  const saldoLimiteCredito = clientSelectedConfirmed ? (clientSelectedConfirmed.limitecredito - clientSelectedConfirmed.titulosvencidos - (-clientSelectedConfirmed.saldoaberto)) : 0.00;

  const unlockBudget = async (data) => {
    if (isHaveRole('Admin')) {
      if (window.confirm('Confirma o desbloqueio deste orçamento?')) {
        data.status.push({ status: 'pending', date: Date.now() })
        const result = await budgetService.put(data)
        if (result.error) {
          Notification('Não foi possível desbloquear este orçamemto!', 'danger')
        } else {
          Notification('Orçamento desbloqueado', 'success')
          getBudgetAndOrderList();
        }
      }
    } else {
      Notification('Você não possui permissão para desbloquear este orçamento', 'danger')
    }
    return
  }

  const editBudget = async (data) => {
    setEditDataBudget(data)
    setIsEditMode(true)
    toggleModal()
  }

  const reservedBudget = async (data) => {
    const result = await budgetService.reserve(data)
    if (result.error) {
      Notification('Não foi possível reservar este orçamemto!', 'danger')
    } else {
      Notification('Orçamento reservado', 'success')
      getBudgetAndOrderList()
    }
  }

  const deleteOrderRow = async (id, idBudget) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      const resultDeleteOrder = await orderService.delete(id)
      if (resultDeleteOrder.error) {
        Notification('Não foi possível deletar este pedido!', 'danger')
      } else {
        const resultDeleteBudget = await budgetService.delete(idBudget)
        if (resultDeleteBudget.error) {
          console.log(resultDeleteBudget, 'Erro ao deletar o orcamento')
        } else {
          Notification('Pedido excluido', 'warning')
          getBudgetAndOrderList()
        }
      }
    }
  }

  const deleteBudgetRow = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
      const result = await budgetService.delete(id)
      if (result.error) {
        Notification('Não foi possível deletar este orçamemto!', 'danger')
      } else {
        Notification('Orçamento excluido', 'warning')
        getBudgetAndOrderList()
      }
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const printBudget = async (data) => {
    const printContent = await budgetService.print(data);
    if (printContent.error) {
      Notification('Houve um erro ao tantar gerar a impressão de orçamento', 'error')
    } else {
      Notification('Impressão de Orçamento realizada', 'success')
      var myWindow = window.open("", "Impressão de Orçamento", "width=900,height=1200");
      myWindow.document.write(printContent.content);
    }
  }

  return <>
    <ContainerTab>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => { toggle('1'); }}
          >
            Movimento Geral
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => { toggle('2'); }}
          >
            Financeiro
          </NavLink>
        </NavItem>
      </Nav>
    </ContainerTab>
    <TabContent activeTab={activeTab}>
      <TabPane tabId="1">
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <Col md="5">
                  <CardTitle tag="h4">
                    Lista de Orçamentos
                  </CardTitle>
                </Col>
              </CardHeader>
              <CardBody>
                <BudgetTable
                  unlockBudget={unlockBudget}
                  budgetList={budgetList}
                  toggleModal={toggleModal}
                  deleteBudgetRow={deleteBudgetRow}
                  approveBudget={approveBudget}
                  editBudget={editBudget}
                  readOnlyBudget={readOnlyBudget}
                  reservedBudget={reservedBudget}
                  validateInput={validateInput}
                  printBudget={printBudget}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Lista de Pedidos</CardTitle>
              </CardHeader>
              <CardBody>
                <OrderTable
                  deleteOrderRow={deleteOrderRow}
                  orderList={orderList}
                  readOnlyOrder={readOnlyOrder} />
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
                    <h5><b>{clientSelectedConfirmed.titulosvencidos ? parseInt(clientSelectedConfirmed.titulosvencidos.replace('.', ',')).toFixed(0) : ''}</b></h5>
                  </Col>
                  <Col md="2">
                    <h5>Primeira Compra:</h5>
                  </Col>
                  <Col md="2">
                    <h5>{moment(clientSelectedConfirmed.pricom).format('DD/MM/yyyy')}</h5>
                  </Col>

                  <Col md={{ size: 2, offset: 2 }}>
                    <h5>Títulos em aberto:</h5>
                  </Col>
                  <Col md="2">
                    <h5>R$ {clientSelectedConfirmed.saldoaberto ?
                      clientSelectedConfirmed.saldoaberto
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
                    <h5>{moment(clientSelectedConfirmed.ultcom).format('DD/MM/yyyy')}</h5>
                  </Col>

                  <Col md={{ size: 2, offset: 2 }}>
                    <h5>Limite de crédito:</h5>
                  </Col>
                  <Col md="2">
                    <h5>R$ {clientSelectedConfirmed.limitecredito ? String(parseInt(clientSelectedConfirmed.limitecredito).toFixed(2))
                      .replace(/\D/g, "")
                      .replace(/(\d+)(\d{2})/, "$1,$2")
                      .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                      .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                      .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3") : ''}</h5>
                  </Col>
                  <Col md="2">
                    <h5>Maior compra:</h5>
                  </Col>
                  <Col md="2">
                    <h5>R$ {clientSelectedConfirmed.maiorcompra ? clientSelectedConfirmed.maiorcompra
                      .replace(/\D/g, "")
                      .replace(/(\d+)(\d{2})/, "$1,$2")
                      .replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3")
                      .replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3")
                      .replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3") : ''}</h5>
                  </Col>

                  <Col md={{ size: 2, offset: 2 }}>
                    <h5><b>Saldo de crédito =</b></h5>
                  </Col>
                  <Col md="2">
                    <h5>
                      <b>
                        R$ {String(saldoLimiteCredito.toFixed(2))
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
                    <h5>{clientSelectedConfirmed.mediaatraso ? clientSelectedConfirmed.mediaatraso.replace('.', ',') : ''}</h5>
                  </Col>
                  <Col md="2">
                    <h5>Títulos protestados:</h5>
                  </Col>
                  <Col md="2">
                    <h5>R$ {clientSelectedConfirmed.titulosprotestados ? String(parseInt(clientSelectedConfirmed.titulosprotestados).toFixed(2)).replace('.', ',') : ''}</h5>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  </>
}

export default SalesTab