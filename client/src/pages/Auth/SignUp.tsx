import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import Container from "../../components/Container";
import FormAuth from "../../components/FormAuth";
import LabelAuth from "../../components/LabelAuth";
import ButtonContainer from "../../components/ButtonContainer";
import { signup } from "../../api/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onChangeHandle = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onSubmit = async () => {
    const data = await signup(userData);
    data && navigate("/login");
  };

  return (
    <Container>
      <FormAuth>
        <FormInput
          type="text"
          name="email"
          width="w-full"
          placeholder="Email Address"
          onChangeName={onChangeHandle}
        />
        <FormInput
          type="password"
          name="username"
          width="w-full"
          placeholder="Username"
          onChangeName={onChangeHandle}
        />
        <FormInput
          type="password"
          name="password"
          width="w-full"
          placeholder="Password"
          onChangeName={onChangeHandle}
        />
        <ButtonContainer>
          <Button
            content="SignUp"
            width="full"
            bgColor="bg-pink-500"
            rounded="rounded-full"
            handleClick={onSubmit}
          />
          <LabelAuth label="Aleady a user?" link="login" linkLabel="LOGIN" />
        </ButtonContainer>
      </FormAuth>
    </Container>
  );
};

export default SignUp;
