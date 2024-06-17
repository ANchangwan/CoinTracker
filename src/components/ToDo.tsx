import { IToDo } from "./atom";

function ToDo({ id, text }: IToDo) {
  return <li>{text}</li>;
}

export default ToDo;
