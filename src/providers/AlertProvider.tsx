import { createContext, ReactNode, useMemo, useState } from "react";

interface AlertContext {
  message: string;
  setMessage: (message: string) => void;
  type?: "success" | "error" | "info" | "warning";
  setType: (type: "success" | "error" | "info" | "warning") => void;
  isAlertShowing: boolean;
  setIsAlertShowing: (value: boolean) => void;
}

export const AlertContext = createContext<AlertContext>({
  message: "",
  setMessage: () => {},
  type: "success",
  setType: () => {},
  isAlertShowing: false,
  setIsAlertShowing: () => {},
});

export function AlertProvider({ children }: { children: ReactNode }) {
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info" | "warning" | undefined>("success");

  if (isAlertShowing) {
    setTimeout(() => {
      setIsAlertShowing(false);
    }, 3000);
  }

  const contextValues = useMemo(
    () => ({
      message,
      setMessage,
      type,
      setType,
      isAlertShowing,
      setIsAlertShowing,
    }),
    [isAlertShowing, message, type],
  );

  return <AlertContext.Provider value={contextValues}>{children}</AlertContext.Provider>;
}
