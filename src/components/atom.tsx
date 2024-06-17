import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  categroy: "ToDo" | "DOING" | "DONE";
}
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
