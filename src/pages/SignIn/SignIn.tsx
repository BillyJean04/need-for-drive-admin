import { Flex, Form, FormProps, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/assets/logo.png";
import { useAuth } from "@/hooks";
import { routesPaths } from "@/utils/consts/routes";

import { StyledButton, StyledCard, StyledSignInContainer, StyledTitle } from "./SignIn.styled";

interface FieldType {
  email: string;
  password: string;
  remember: string;
}

export function SignIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setIsLoading(true);

    auth
      ?.login({ username: values.email.trim(), password: values.password.trim() })
      .then(() => {
        navigate(routesPaths.home);
      })
      .finally(() => setIsLoading(false));
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
                message: "Введите корректную почту!",
              },
              {
                max: 150,
                message: "Длина почты не должна превышать 150 символов!",
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
                required: true,
                message: "Введите пароль!",
              },
              {
                max: 150,
                message: "Длина пароля не должна превышать 150 символов!",
              },
            ]}
          >
            <Input.Password placeholder="*************" />
          </Form.Item>
          <Flex justify="space-between" align="center">
            <Flex vertical>
              <Typography.Link onClick={() => navigate(routesPaths.signUp)}>
                Зарегистрироваться
              </Typography.Link>
            </Flex>
            <Form.Item style={{ margin: 0 }}>
              <StyledButton loading={isLoading} type="primary" htmlType="submit" size="large">
                Войти
              </StyledButton>
            </Form.Item>
          </Flex>
        </Form>
      </StyledCard>
    </StyledSignInContainer>
  );
}
