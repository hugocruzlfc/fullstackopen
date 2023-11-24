import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { State, Action } from "./reducer";
import { Diagnose, StateProviderProps } from "../types";
import { diagnosesService } from "../services";

const StateContext = createContext<[State, React.Dispatch<Action>, Diagnose[]]>(
  [{ patients: {} }, (dispatchEvent) => dispatchEvent, []]
);

export const useStateValue = () => useContext(StateContext);

const initialState: State = {
  patients: {},
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [diagnosis, setDiagnosis] = useState<Diagnose[]>([]);

  useEffect(() => {
    const fectchDiagnosis = async () => {
      const diagnosis = await diagnosesService.getAll();
      setDiagnosis(diagnosis);
    };
    fectchDiagnosis();
  }, [state]);
  return (
    <StateContext.Provider value={[state, dispatch, diagnosis]}>
      {children}
    </StateContext.Provider>
  );
};
