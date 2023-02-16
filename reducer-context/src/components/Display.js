import { useCounterValue } from "../hooks/useCounterValue";

const Display = () => {
  const counter = useCounterValue();

  return <div>{counter}</div>;
};

export default Display;
