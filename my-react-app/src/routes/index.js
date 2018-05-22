import React from 'react';
import {Route, HashRouter, Switch} from 'react-router-dom'
import Home from '../views/home'
import Tab from '../views/tab'
import Test from '../views/test'
import Flex from '../views/flex'
import Marquee from '../views/marquee'

const Routes = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/tab" component={Tab} />
            <Route path="/test" component={Test} />
            <Route path="/flex" component={Flex} />
            <Route path="/marquee" component={Marquee} />
        </Switch>
    </HashRouter>
)

export default Routes;
