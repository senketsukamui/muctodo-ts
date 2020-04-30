import React from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import "./index.scss";
interface AuthSceneProps {}
const AuthScene = (props: AuthSceneProps) => {
  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  return (
    <div className="login-page__wrapper">
      <div className="login-page">
        <div className="font-big login-page__login">Login</div>
        <div className="login-page__username">
          <div className="font-medium text-center">Username</div>
          <InputGroup type="text" large placeholder="enter your username" />
        </div>
        <div className="login-page__login">
          <div className="font-medium text-center">Password</div>
          <InputGroup type="password" large placeholder="enter your password" />
        </div>
        <div className="login-page__login-button">
          <Button text = "Login"/>
        </div>
      </div>
    </div>
  );
};

export default AuthScene;
