import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./routes/Home"
import Login from './routes/Login'
import Nonmem from './routes/Nonmem'
import Storage from './routes/Storage'
import Shop from './routes/Shop'
import Shopdetail from './routes/Shopdetail.js'
import Join from './routes/Join.js'
import Friends from './routes/Friends.js'


function App () {
	
	return (
			<Router>
				<Switch>
					<Route path="/" exact={true} component={Login} />
					<Route path="/Home" component={Home} />
					<Route path="/Non" component={Nonmem} />
					<Route path="/Storage" component={Storage} />
					<Route path="/Shop" component={Shop} />
					<Route path="/Shopdetail" component={Shopdetail} />
					<Route path="/Join" component={Join} />
					<Route path="/Friends" component={Friends} />
				</Switch>
			</Router>
		
	);
};

export default App;