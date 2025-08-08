export enum LocaleEnum {
  EN = "EN",
  UK = "UK",
}

export function isLocaleEnum(value: string): value is LocaleEnum {
  return Object.values(LocaleEnum).includes(value as LocaleEnum);
}
