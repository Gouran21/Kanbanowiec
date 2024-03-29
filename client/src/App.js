import React from 'react';
import './App.css';
import TablePage from './TablePage.js';
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import User from './user'

async function IsLogged() {
  let user = User.Get();
  if (user) {
    if(user.email !== "'" && user.token !== "") {
      return true;
    }
  }
  return false;
}

// function requireAuth(nextState, replace) {
//   if (!loggedIn()) {
//     replace({
//       pathname: '/login'
//     })
//   }
// }
function App() {
  const [logged, setLogged] = React.useState(false);

  function HandleSuccesfulLogin(data) {
    User.Set(data.email,data.token);
    setLogged(true);
  }
  function HandleLogout() {
    User.Clear();
    setLogged(false);
  }

  React.useEffect( () => {
    async function DoStuff() {
      setLogged( await IsLogged() );
    }
    DoStuff();
  } , [setLogged] );

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => (logged ? <TablePage logout={HandleLogout} /> : <Login callback={HandleSuccesfulLogin} />)}
      />
      <Route
        path='/signup'
        render={() => (logged ? <div>WTF Wynoś się</div> : <Signup />)}
      />
    </Switch>
  )
}

export default App;
