import type { LocalisedDictionaryType } from "@/modules/dictionary/types";
import { LocaleEnum } from "@/modules/intl";

import enDictionary from "./data/en.json";
import ukDictionary from "./data/uk.json";

export class Dictionary {
  private readonly localisedDictionary: LocalisedDictionaryType;

  constructor() {
    this.localisedDictionary = {
      [LocaleEnum.EN]: enDictionary,
      [LocaleEnum.UK]: ukDictionary,
    };
  }

  public getRandomWord(locale: LocaleEnum, previousWord?: string): string {
    const randomWord =
      this.localisedDictionary[locale][Math.floor(Math.random() * this.localisedDictionary[locale].length)];
    if (previousWord && randomWord === previousWord) {
      return this.getRandomWord(locale, previousWord);
    }
    return randomWord;
  }

  public checkWordExists(word: string, locale: LocaleEnum): boolean {
    return this.localisedDictionary[locale].includes(word.toLowerCase());
  }
}
