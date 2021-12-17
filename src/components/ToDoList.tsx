import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector, Categories } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import todo from "../img/to-do-list.png";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Body = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  background-color: #487eb0;
  max-width: 620px;
`;

const Title = styled.h1`
  width: 100%;
  height: 20vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 900;
  color: ${(props) => props.theme.accentColor};
  img {
    width: 50px;
    margin-right: 10px;
  }
`;
const Subheader = styled.div`
  margin-bottom: 40px;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;
const Select = styled.select`
  width: 70px;
  height: 50px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #2f3640;
  border-radius: 12px;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70px;
  margin-bottom: 10px;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Wrapper>
      <Body>
        <Title>
          <img src={todo} alt="todo_img" />
          To Do List
        </Title>
        <Subheader>
          <Select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </Select>
          <CreateToDo />
        </Subheader>
        {toDos?.map((toDo) => (
          <List key={toDo.id} style={{ display: "flex" }}>
            <ToDo {...toDo} />
          </List>
        ))}
      </Body>
    </Wrapper>
  );
}

export default ToDoList;
