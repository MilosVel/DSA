import { createObservable, useObservable } from "./useObservable";

const globalState = createObservable({
  count: 0,
});

function Counter() {
  const counter = useObservable(globalState);
  return (
    <div>
      <div>Count = {counter.count}</div>
      <button onClick={() => (counter.count += 1)}>Add new One</button>
    </div>
  );
}
export default Counter;