export type RootList = {
  groups: undefined
  new: undefined
  players: {
    group: string
  }
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootList {}
  }
}