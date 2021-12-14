import React from "react";
import { useForm } from "react-hook-form";

interface Iform {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Iform>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onSubmit = (data: Iform) => {
    if (data.password !== data.password1) {
      // setError => 특정 조건에서 에러 발생 시킴
      // setError("name => 에러 대상", "message => 에러 발생 시 메세지 출력", "shouldFocus => 에러 발생 시 마우스 위치 이동")
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
  // console.log(errors);
  return (
    <div>
      <form
        // handleSubmit => 1번째 인자는 데이터가 유효 할때(필수), 2번째 인자는 데이터가 유효하지 않을 때(선택)
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          // regiter("name", {obtion});
          {...register("email", {
            // required를 tag에 넣지 않고 register안에 넣는 이유는 누군가가
            // 개발자 도구에서 해당 태그를 지우고 Add를 눌렀을 시 submit이 되기 때문에
            // 수정하지 못하는 register에 넣어두는게 더 안전하고 좋은 방법
            required: "Email is required",
            // pattern의 value값과 일치하지 않으면 pattern 내부의 message를 보여줌
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        {/*  
              tpye: "required" => "Email is required"
              type: "pattern" => "Only naver.com emails allowed"
              출력함 
              console.log(errors); 로 확인해보면 됨
        */}
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here",
            // validate 특정 조건 검사
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="FirstName"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="LastName"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", { required: "write here", minLength: 5 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        {/* <span>{errors?.extraError?.message}</span> */}
      </form>
    </div>
  );
}

export default Form;
