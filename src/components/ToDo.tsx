import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import todo from "../img/todo.png";
import doing from "../img/doing.png";
import trash from "../img/trash.png";
import done from "../img/done.png";
const List = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebedf2;
  border-bottom: 2px solid black;
  border-radius: 12px;
  color: ${(props) => props.theme.accentColor};
`;
const Contents = styled.span`
  margin-right: 20px;
  font-size: 22px;
  font-weight: 500;
`;
const Btn = styled.button`
  border: none;

  margin: 0px 2px;
  background-color: Transparent;
  background-repeat: no-repeat;
  color: white;
  cursor: pointer;
  img {
    width: 25px;
  }
`;

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
      const ChangeCate = { text, id, category: name as any };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        ChangeCate,
        ...oldToDos.slice(targetIndex + 1),
      ];
      const stringifiedToDos = JSON.stringify(newToDos);
      localStorage.setItem("ToDos", stringifiedToDos);
      return newToDos;
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
    <List id={id as any}>
      <Contents>{text}</Contents>
      {category !== Categories.DOING && (
        <Btn name={Categories.DOING} onClick={onclick}>
          <img src={doing} alt="doing" />
        </Btn>
      )}
      {category !== Categories.TO_DO && (
        <Btn name={Categories.TO_DO} onClick={onclick}>
          <img src={todo} alt="todo" />
        </Btn>
      )}
      {category !== Categories.DONE && (
        <Btn name={Categories.DONE} onClick={onclick}>
          <img src={done} alt="done" />
        </Btn>
      )}
      <Btn onClick={DeleteToDo}>
        <img src={trash} alt="trash" />
      </Btn>
    </List>
  );
}

export default ToDo;
