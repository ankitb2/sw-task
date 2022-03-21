import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App';
import NotFoundPage from '../components/NotFoundPage';
import PlanetDetails from '../components/Planets/PlanetDetails';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/planetdetails' component={PlanetDetails} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
