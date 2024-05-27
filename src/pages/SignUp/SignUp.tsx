import { Flex, Form, FormProps, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/assets/logo.png";
import { sleep } from "@/utils";

import { StyledButton, StyledCard, StyledSignInContainer, StyledTitle } from "./SignUp.styled";

interface FieldType {
  email: string;
  password: string;
  confirmPassword: string;
  remember: string;
}

export function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    setIsLoading(true);
    sleep(1000).then(() => {
      setIsLoading(false);
      navigate("/");
    });
  };

  return (
    <StyledSignInContainer justify="center" align="center" vertical gap={16.5}>
      <img src={Logo} alt="logo" />
      <StyledCard>
        <StyledTitle level={4}>Вход</StyledTitle>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            className="input"
            label="Почта"
            name="email"
            rules={[
              {
                type: "email",
                whitespace: false,
                required: true,
                max: 150,
                message: "Пожалуйста введите корректную почту!",
              },
            ]}
          >
            <Input placeholder="qwerty@gmail.com" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[
              {
                whitespace: false,
                max: 150,
                required: true,
                message: "Пожалуйста введите пароль!",
              },
            ]}
          >
            <Input.Password placeholder="*************" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Подтвердите пароль"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                whitespace: false,
                max: 150,
                required: true,
                message: "Пожалуйста подтвердите пароль!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="*************" />
          </Form.Item>
          <Flex justify="space-between" align="center">
            <Flex vertical>
              <Typography.Link onClick={() => navigate("/")}>Войти</Typography.Link>
            </Flex>
            <Form.Item style={{ margin: 0 }}>
              <StyledButton loading={isLoading} type="primary" htmlType="submit" size="large">
                Зарегистрироваться
              </StyledButton>
            </Form.Item>
          </Flex>
        </Form>
      </StyledCard>
    </StyledSignInContainer>
  );
}
