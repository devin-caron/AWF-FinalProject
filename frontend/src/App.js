import './App.css';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Login from './Pages/Login';
import Education from './Pages/Education';
import Work from './Pages/Work';
import Activities from './Pages/Activities';
import Personal from './Pages/Personal';
import Other from './Pages/Other';


function App() {
  return (
    <>
    <Router>
      <SideBar />
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/education' exact component={Education}/>
        <Route path='/work' component={Work}/>
        <Route path='/activities' component={Activities}/>
        <Route path='/personal' component={Personal}/>
        <Route path='/other' component={Other}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
