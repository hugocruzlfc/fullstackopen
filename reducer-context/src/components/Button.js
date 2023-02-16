import { useCounterDispatch } from "../hooks/useCounterDispatch";

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch();

  return <button onClick={() => dispatch({ type })}>{label}</button>;
};

export default Button;
