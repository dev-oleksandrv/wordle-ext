import { BasePersistAdapter } from "./base-persist-adapter";

export class ChromeStoragePersistAdapter extends BasePersistAdapter {
  public getItem(keyName: string): string | null | Promise<string | null> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(keyName, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[keyName] || null);
        }
      });
    });
  }

  public setItem(keyName: string, value: string): unknown | Promise<unknown> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [keyName]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(null);
        }
      });
    });
  }

  public removeItem(keyName: string): unknown | Promise<unknown> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(keyName, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(null);
        }
      });
    });
  }
}
