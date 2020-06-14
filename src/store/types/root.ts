import { AppState } from './app'

export interface RootState {
  version: string;
}

export interface RootStateWithModules extends RootState {
  app: AppState;
}
