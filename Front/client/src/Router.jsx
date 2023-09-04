import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './routes/Login'
import Nonmem from './routes/Nonmem'
import Storage from './routes/Storage'
import Shop from './routes/Shop'
import Shopdetail from './routes/Shopdetail'
import Join from './routes/Join'
import Friends from './routes/Friends'
import Homec from './routes/Homecopy';
import Login1 from './routes/Login1'
import Mypage from './routes/Mypage'

const RouterPage = () => {
  return (

    <BrowserRouter>
    <Switch>
        <Route path="/DeHaPrototype/" exact={true} component={Login} />
        <Route path="/DeHaPrototype/test" component={Login1} />
        <Route path="/DeHaPrototype/Home" component={Homec} />
        <Route path="/DeHaPrototype/Non" component={Nonmem} />
        <Route path="/DeHaPrototype/Storage" component={Storage} />
        <Route path="/DeHaPrototype/Shop" component={Shop} />
        <Route path="/DeHaPrototype/Shopdetail" component={Shopdetail} />
        <Route path="/DeHaPrototype/Join" component={Join} />
        <Route path="/DeHaPrototype/Friends" component={Friends} />
        <Route path="/DeHaPrototype/Mypage" component={Mypage} />
    </Switch>
</BrowserRouter>
  )
}

export default RouterPage