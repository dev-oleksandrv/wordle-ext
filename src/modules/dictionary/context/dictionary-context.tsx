import { Dictionary } from "@/modules/dictionary";
import { createContext, type PropsWithChildren, useRef } from "react";

export const DictionaryContext = createContext<Dictionary>({} as Dictionary);

export function DictionaryContextProvider({ children }: PropsWithChildren) {
  const dictionaryRef = useRef<Dictionary>(new Dictionary());

  return <DictionaryContext.Provider value={dictionaryRef.current}>{children}</DictionaryContext.Provider>;
}
