import { atom, selector } from "recoil";

/*
	enum은 계속해서 저장해야 하는 값을 저장할 수 있는 도구임
	enum의 type은 숫자 0,1,2 임 
	그래서 "TO_DO" = "TO_DO" 로 타입 설정 해줌
 */
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

const localStorageToDos = JSON.parse(localStorage.getItem("ToDos") || "{}");
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localStorageToDos?.length > 0 ? localStorageToDos : [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
