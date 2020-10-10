import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input, Button} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = () => {
  const { settoken, setUser } = useContext(AuthContext);

  const [sucess, setSucess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    await axios
      .post("http://localhost:3005/login", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
        localStorage.setItem("email", res.data.email);
        settoken(res.data.token);
        setUser(res.data.user);
        setSucess(true);
      })
      .catch((error) => {
        console.log('errors', error.response.data)
        setEmailError(error.response.data.email);
        setPasswordError(error.response.data.password)
        setSucess(false)

      });
  };

  if (sucess) {
    return <Redirect to="/" />;
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
        extra={emailError}
      >
        <Input
          type="email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
        extra={passwordError}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to={"/signup"}>Sign Up</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
