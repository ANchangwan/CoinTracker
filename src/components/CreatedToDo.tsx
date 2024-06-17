import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atom";

interface IForm {
  toDo: string;
}
function CreatedToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleVaild = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), categroy: "ToDo" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleVaild)}>
      <input {...register("toDo", { required: "write todo" })} />
      <button>Add</button>
    </form>
  );
}

export default CreatedToDo;
