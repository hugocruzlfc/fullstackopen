import { Action, State } from "../state";

export type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactNode;
};
