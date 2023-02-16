import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[1];
};
