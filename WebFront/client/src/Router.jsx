import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './routes/Login'
import Nonmem from './routes/Nonmem'
import Storage from './routes/Storage'
import Shop from './routes/Shop'
import Shopdetail from './routes/Shopdetail'
import Join from './routes/Join'
import Friends from './routes/Friends'
import Homec from './routes/Homecopy';
import Friendss from './routes/Friendss'
import Login1 from './routes/Login1'

const RouterPage = () => {
  return (

    <BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/test" component={Login1} />
        <Route path="/Home" component={Homec} />
        <Route path="/Non" component={Nonmem} />
        <Route path="/Storage" component={Storage} />
        <Route path="/Shop" component={Shop} />
        <Route path="/Shopdetail" component={Shopdetail} />
        <Route path="/Join" component={Join} />
        <Route path="/Friends" component={Friends} />
        <Route path="/Friendss" component={Friendss} />
    </Switch>
</BrowserRouter>
  )
}

export default RouterPage