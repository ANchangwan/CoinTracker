import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atom";

interface IForm {
  ToDo: string;
}
function CreatedToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleVaild = ({ ToDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: ToDo, id: Date.now(), category: "To_Do" },
      ...oldToDos,
    ]);
    setValue("ToDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleVaild)}>
      <input {...register("ToDo", { required: "write todo" })} />
      <button>Add</button>
    </form>
  );
}

export default CreatedToDo;
