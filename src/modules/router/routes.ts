export enum RouterViewEnum {
  SETUP = "SETUP",
  GAME = "GAME",
}

export function isRouterViewEnum(value: string): value is RouterViewEnum {
  return Object.values(RouterViewEnum).includes(value as RouterViewEnum);
}
