import { Button } from "antd";
import { FallbackProps } from "react-error-boundary";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

import { routesPaths } from "@/utils/consts/routes";

import { StyledError } from "./Error.styled";

interface ErrorProps {
  error?: FallbackProps["error"];
  resetErrorBoundary?: FallbackProps["resetErrorBoundary"];
}

export function Error({ resetErrorBoundary, error }: ErrorProps) {
  const routeError = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(routeError)) {
    return (
      <StyledError>
        <h1>{routeError.status}</h1>
        <h2>Страница не найдена</h2>
        <p>Возможно, введен некорректный адрес или страница была удалена</p>
        <Button type="primary" onClick={() => navigate(`${routesPaths.dashboard}`)}>
          Назад
        </Button>
      </StyledError>
    );
  }
  return (
    <StyledError>
      <h1>{error.status}</h1>
      <h2>Что-то пошло не так</h2>
      <p>Попробуйте перезагрузить страницу</p>
      <Button type="primary" onClick={resetErrorBoundary}>
        Назад
      </Button>
    </StyledError>
  );
}
