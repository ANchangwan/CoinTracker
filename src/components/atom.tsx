import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "To_Do" | "DOING" | "DONE";
}
export const toDoState = atom<IToDo[]>({
  key: "ToDo",
  default: [],
});
