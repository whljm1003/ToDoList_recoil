import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      /* categery에는 name이 없기에 as any로 typescript 에게 이거는 신경쓰지말라고 알려줌
      하지만 이거는 별로 좋은 방법이 아님 
      onclick 함수에 parameter를 넣어서 <button onClick={() => onclick(value)}></button>
      으로 사용 하는 걸 선호 함 */
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const DeleteToDo = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { parentElement },
    } = event;

    setToDos((oldToDos) => {
      const newTodoArray = oldToDos.filter(
        (todo) => todo.id !== Number(parentElement?.id)
      );
      const stringifiedNewToDos = JSON.stringify(newTodoArray);
      localStorage.setItem("ToDos", stringifiedNewToDos);
      return newTodoArray;
    });
  };

  return (
    <li id={id as any}>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onclick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onclick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onclick}>
          Done
        </button>
      )}
      <button onClick={DeleteToDo}>DELETE</button>
    </li>
  );
}

export default ToDo;
