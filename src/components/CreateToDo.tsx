import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState, categoryState } from "../atoms";

const ToDoInput = styled.input`
  width: 220px;
  height: 50px;
  margin: 0px 20px;
  border-radius: 5px;
  text-align: center;
  font-size: 25px;
  border: none;
  @media screen and (max-width: 450px) {
    font-size: 20px;
    width: 180px;
    margin: 5px;
  }
`;

const AddBtn = styled.button`
  border: none;
  cursor: pointer;
  height: 50px;
  width: 60px;
  font-weight: 800;
  font-size: 23px;
  border-radius: 5px;
  opacity: 0.8;
  color: white;
  background-color: ${(props) => props.theme.accentColor};
  &:hover {
    opacity: 1;
  }
`;

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
      <ToDoInput
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <AddBtn>Add</AddBtn>
    </form>
  );
}

export default CreateToDo;
