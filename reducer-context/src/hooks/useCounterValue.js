import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[0];
};
