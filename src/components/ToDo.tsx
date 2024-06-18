import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atom";

function ToDo({ id, text, category }: IToDo) {
  const setToDo = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDo((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: newCategory as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>TO DO</button>
      )}
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
