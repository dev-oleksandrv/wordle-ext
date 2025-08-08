export abstract class BasePersistAdapter {
  public getItem(_keyName: string): string | null | Promise<string | null> {
    console.warn("getItem is not implemented in BasePersistAdapter");
    return null;
  }

  public setItem(_keyName: string, _value: string): unknown | Promise<unknown> {
    console.warn("setItem is not implemented in BasePersistAdapter");
    return null;
  }

  public removeItem(_keyName: string): unknown | Promise<unknown> {
    console.warn("removeItem is not implemented in BasePersistAdapter");
    return null;
  }
}
