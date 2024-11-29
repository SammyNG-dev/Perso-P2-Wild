import { createContext, useContext, useState } from "react";

interface IsOnlineContextType {
  isOnline: boolean;
  setIsOnline: React.Dispatch<React.SetStateAction<boolean>>;
}

const IsOnlineContext = createContext<IsOnlineContextType | null>(null);

export function IsOnlineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  return (
    <IsOnlineContext.Provider value={{ isOnline, setIsOnline }}>
      {children}
    </IsOnlineContext.Provider>
  );
}

export function useIsOnline() {
  const value = useContext(IsOnlineContext);
  if (value === null) {
    throw new Error("useContext has to be used within a <IsOnlineProvider>");
  }
  return value;
}
