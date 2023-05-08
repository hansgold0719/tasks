import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import Container from "../../components/Container";
import FormAuth from "../../components/FormAuth";
import LabelAuth from "../../components/LabelAuth";
import ButtonContainer from "../../components/ButtonContainer";
import { signin } from "../../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandle = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const data = await signin(loginData);
    localStorage.setItem("token", JSON.stringify(data));
    if (data) {
      navigate("/");
    } else {
      alert("error");
    }
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
          name="password"
          width="w-full"
          placeholder="Password"
          onChangeName={onChangeHandle}
        />
        <ButtonContainer>
          <Button
            content="Login"
            width="full"
            bgColor="bg-pink-500"
            rounded="rounded-full"
            handleClick={handleSubmit}
          />
          <LabelAuth
            label="Need an Account?"
            link="signup"
            linkLabel="SIGN UP"
          />
        </ButtonContainer>
      </FormAuth>
    </Container>
  );
};

export default Login;
