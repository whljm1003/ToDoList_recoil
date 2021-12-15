import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoState, categoryState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [ToDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    // setToDos((oldToDos) => [
    //   { text: toDo, id: Date.now(), category: category },
    //   ...oldToDos,
    // ]);
    setToDos((oldToDos) => {
      const ToDos = [{ id: Date.now(), text: toDo, category }, ...oldToDos];
      const stringifiedToDos = JSON.stringify(ToDos);
      localStorage.setItem("ToDos", stringifiedToDos);
      return ToDos;
    });

    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
