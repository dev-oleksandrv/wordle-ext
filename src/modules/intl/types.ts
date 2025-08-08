export type IntlTranslationsDictionaryNodeType = string | IntlTranslationsDictionaryType;

export interface IntlTranslationsDictionaryType {
  [key: string]: IntlTranslationsDictionaryNodeType;
}
