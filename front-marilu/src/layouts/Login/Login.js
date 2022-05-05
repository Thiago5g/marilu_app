import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import logoMarilu from '../../../src/assets/img/marca-marilu.png'
import authService from '../../services/auth.service'
import { LoginContainer, LoginCard, B } from './styles'

const Login = (props) => {

  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {

    e.preventDefault()
    const { value, name } = e.target
    if (name === 'username') setUsername(value)
    if (name === 'password') setPassword(value)
  }

  const handleSubmit = async (e) => {

    setLoading(true)

    try {
      const authData = { username, password }
      const result = await authService.sigIn(authData) 
      const { token = false, email = false, permissions = false } = result 
      if (token && email && permissions) { 
        await localStorage.setItem('userData', JSON.stringify({ token, email, permissions })) 
        props.history.push('/admin')
      }else{
        setMessage(result.message)
        setLoading(false)
      }

    } catch (error) {
      setLoading(false)
    }
}

return (
  <>
    <LoginContainer></LoginContainer>
    <LoginCard>
        <Row>
          <Col md="12">
            <CardGroup>
              <Card color="primary" className="p-4 ">
                <CardBody>
                  <Form>
                    <div className="text-center text-justify" style={{ padding: "35px " }} >
                      <img width="160" src={logoMarilu} alt="Marilu Logo" />
                    </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend" >
                        <InputGroupText >
                          <i className="tim-icons icon-single-02"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className={'teste'}
                        type="text"
                        placeholder="Usuário"
                        autoComplete="email"
                        name="username"
                        value={username}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        name="password"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="12">
                        <Button color="neutral" size="lg" block style={{ width: '50%', margin: '10px auto' }} type="button" onClick={handleSubmit}>
                          <B>{loading === true ? 'Entrando' : 'Entrar'}</B>
                        </Button>
                      </Col>
                      <Col xs="12" className="text-center">
                        <h5 style={{height:'15px', color: '#fff'}}>{message}</h5>
                        {/* <Button color="link" className="px-0 btn-forgot-password" type="button" >
                          Esqueceu a senha?
                            </Button> */}
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </LoginCard>
    </>
);
}

export default Login
