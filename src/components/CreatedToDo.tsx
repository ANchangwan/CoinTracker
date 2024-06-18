import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atom";

interface IForm {
  ToDo: string;
}
function CreatedToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleVaild = ({ ToDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: ToDo, id: Date.now(), category },
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
