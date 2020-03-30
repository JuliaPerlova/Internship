import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Route } from 'react-router-dom';
import Main from './Components/Main/Main';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Forgot from './Components/Forgot/Forgot';
import NewPassword from './Components/NewPassword/NewPassword';

function App() {
  return (
    <div className="App">
      <Route path="/auth/sign-up" component={Signup} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/forgot" component={Forgot} />
      <Route path="/main/:uId/token=:token" component={Main} />
    </div>
  );
}

export default App;
