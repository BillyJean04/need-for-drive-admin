import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";

interface MenuTriggerContext {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const MenuTriggerContext = createContext<MenuTriggerContext>({
  collapsed: false,
  setCollapsed: () => {},
});

export function MenuTriggerProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const contextValues = useMemo(
    () => ({
      collapsed,
      setCollapsed,
    }),
    [collapsed],
  );

  return (
    <MenuTriggerContext.Provider value={contextValues}>{children}</MenuTriggerContext.Provider>
  );
}
