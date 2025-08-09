import { useContext } from "react";
import { DictionaryContext } from "@/modules/dictionary/context/dictionary-context";

export function useDictionary() {
  return useContext(DictionaryContext);
}
