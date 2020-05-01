import React from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import "./index.scss";
import { userLogin } from './../../store/actions/user';
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { StoreRootState } from './../../store/types';
import { getLocalStorageToken } from "../../utils";
interface AuthSceneProps {
  userLogin: (payload: {username: string, password: string}) => Promise<any>
}
const AuthScene = (props: AuthSceneProps) => {
  const history = useHistory()
  if(getLocalStorageToken()) {
    history.push("/list")
  }
  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const onLoginClick = () => {
    props.userLogin({username: username, password: password})
  }
  return (
    <div className="login-page__wrapper">
      <div className="login-page">
        <div className="font-big login-page__login">Login</div>
        <div className="login-page__username">
          <div className="font-medium text-center">Username</div>
          <InputGroup type="text" large placeholder="enter your username" onChange = {(e:any) => setUsername(e.target.value)}/>
        </div>
        <div className="login-page__login">
          <div className="font-medium text-center">Password</div>
          <InputGroup type="password" large placeholder="enter your password" onChange = {(e:any) => setPassword(e.target.value)}/>
        </div>
        <div className="login-page__login-button">
          <Button text = "Login" onClick = {onLoginClick} />
        </div>
      </div>
    </div>
  );
};

export default connect((store: StoreRootState) => ({token: store.user.token}), {userLogin})(AuthScene);
