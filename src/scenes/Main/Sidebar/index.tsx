import React from 'react';
import "./index.scss"
import { Button } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { deleteToken } from './../../../store/actions/user';
import { deleteLocalStorageToken } from './../../../utils/index';
import { useHistory } from 'react-router-dom';
interface SidebarProps {
  deleteToken: () => void
}
const Sidebar = (props: SidebarProps) => {
  const history = useHistory()
  const onLogoutClick = () => {
    props.deleteToken();
    deleteLocalStorageToken()
    history.push("/auth")
  }
  return <div className = "sidebar">
    <div className="sidebar__username">New User</div>
    <div className="sidebar__notes">Notes</div>
    <div className="sidebar__groups">Groups</div>
    <div className="sidebar__welcome" onClick={() => history.push("/welcome")}>Welcome</div>
    <Button className="sidebar__logout-button" text = "Logout" intent="danger" onClick = {onLogoutClick}/>
  </div>

}

export default connect(null, {deleteToken})(Sidebar);