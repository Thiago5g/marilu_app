import React, { useState, useEffect } from "react"
import SignupClientTable from '../components/Tables/SignupClientTable'
import { cloneObject } from '../helpers/cloneObject'
import { Notification } from '../helpers/notification'
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
  Input,
  Collapse
} from "reactstrap";

function Signup() {

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{ marginBottom: '10px' }}>
                <CardTitle tag="h4">Cadastro de clientes</CardTitle>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12" style={{ padding: 10}}>
            <Card style={{ padding: 20}}>
            <SignupClientTable />
          </Card>
        </Col>
      </Row>
    </div >
    </>
  );
}

export default Signup;
