import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";

interface AlertOptions {
  message?: string;
  type?: "info" | "error" | "warning" | "success";
}

interface AlertContext {
  alertOptions: AlertOptions;
  setAlertOptions: Dispatch<SetStateAction<AlertOptions>>;
  isAlertShowing: boolean;
  setIsAlertShowing: Dispatch<SetStateAction<boolean>>;
}

export const AlertContext = createContext<AlertContext>({
  alertOptions: {},
  setAlertOptions: () => {},
  isAlertShowing: false,
  setIsAlertShowing: () => {},
});

export function AlertProvider({ children }: { children: ReactNode }) {
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({});

  if (isAlertShowing) {
    setTimeout(() => {
      setIsAlertShowing(false);
    }, 3000);
  }

  const contextValues = useMemo(
    () => ({
      alertOptions,
      setAlertOptions,
      isAlertShowing,
      setIsAlertShowing,
    }),
    [alertOptions, isAlertShowing],
  );

  return <AlertContext.Provider value={contextValues}>{children}</AlertContext.Provider>;
}
