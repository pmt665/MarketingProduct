import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Advertisements from './components/Advertisement/Advertisements';
import NotFound from './components/NotFound';
import Offers from './components/Offer/Offers';
import AddAdvertisement from './containers/AddAdvertisement';
import AddOffer from './containers/AddOffer';

const Routes = ({ childProps }) => {
    return (
        <Switch>
            <Route
                path={'/add-offer'}
                exact
                component={AddOffer}
                props={childProps}
            />
            <Route
                path={['/offers', '/']}
                exact
                component={Offers}
                props={childProps}
            />
            <Route
                path={'/add-advertisement'}
                exact
                component={AddAdvertisement}
                props={childProps}
            />
            <Route
                path={'/advertisements'}
                exact
                component={Advertisements}
                props={childProps}
            />
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
    
}

export default Routes