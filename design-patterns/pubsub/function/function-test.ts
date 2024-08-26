import { createSubscribable } from "./Subscribable-function";

const sub = createSubscribable<string>();
const unsub = sub.subscribe(console.log);
sub.publish("Hello  wwww");
sub.publish("Whatever");
unsub();
sub.publish("Goodbye www");
