import { createStateHook } from "./simpleStateManager";

const useCounter = createStateHook(0);

const Counter = () => {
  const [count, setCount] = useCounter();

  return (
    <div className="flex flex-col gap-4">
      <button
        className="bg-blue-500 rounded-md w-fit"
        onClick={() => setCount(count + 1)}
      >
        Add One
      </button>
      <div>Count = {count}</div>
    </div>
  );
};

export default Counter;
