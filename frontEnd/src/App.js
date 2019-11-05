import React, { Component } from 'react';
import {createBrowserHistory} from 'history'
import {Router, Route} from 'react-router-dom';
import DashBoard from './containers/DashBoard/DashBoard';
import HomePage from './containers/HomePage/Homepage';
import Admin from './containers/Admin/AdminContainer/AdminContainer';

const history = createBrowserHistory();

class App extends Component {
  state = {
    accountType: null
  }

  componentDidMount() {
    const accountType = localStorage.getItem('RDACTP');
    this.setState({
      accountType: accountType
    });
  }


  render() {
    let protectedRoutes = null;
    if (this.state.accountType === '2485693124578965412478933254895464123648') {
      protectedRoutes = (
        <Route path="/admin" component={Admin}/>
      );
    } else if(this.state.accountType === '284695743215'){
      protectedRoutes = (
        <Route path="/dashboard" component={DashBoard}/>
      );
    } else {
      protectedRoutes = null;
    }
    return (
      <div>
        <Router history={history}>
          <Route path="/" exact={true} component={HomePage} />
          {protectedRoutes}
        </Router>
      </div>
    );
  }
}

export default App;