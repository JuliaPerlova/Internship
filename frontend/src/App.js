import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Route } from 'react-router-dom';
import Main from './Components/Main/Main';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Forgot from './Components/Forgot/Forgot';
import NewPassword from './Components/NewPassword/NewPassword';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function App() {
  return (
    <div className="App">
      <Route path="/auth/sign-up" component={Signup} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/forgot" component={Forgot} />
      <Route path="/auth/change/token=:token" component={NewPassword} />
      <Route path="/main" component={Main} />
    </div>
  );
}

export default App;
