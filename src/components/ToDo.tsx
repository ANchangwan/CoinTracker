import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atom";

function ToDo({ id, text, category }: IToDo) {
  const setToDo = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "To_Do" && (
        <button onClick={() => onClick("To_Do")}>TO DO</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
