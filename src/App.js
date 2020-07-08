import React, {Component} from 'react';
import {Route, Switch} from 'react-router'
import './App.css';
import {ROUTES} from "./routes";
import HomePageLogic from "./containers/HomePageLogic";
import Login from "./containers/Login";
import Register from "./containers/Register";
import TeamCreate from "./containers/Team/TeamCreate";
import Teams from "./containers/Team/Teams";
import PrivateRoute from "./containers/PrivateRoute";
import TeamHome from "./containers/Team/TeamHome";
import TeamPage from "./containers/Team/TeamPage";
import ScrimPage from "./containers/Scrims/ScrimPage";
import Invitation from "./containers/Invitation";
import Notifications from "./containers/Notifications/Notifications";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={HomePageLogic}/>
                    <Route exact path={ROUTES.LOGIN} component={Login}/>
                    <Route exact path={ROUTES.REGISTER} component={Register}/>
                    <Route exact path={ROUTES.CREATE_TEAM} component={TeamCreate}/>
                    <Route exact path={ROUTES.INVITE} component={Invitation}/>
                    <PrivateRoute exact path={ROUTES.TEAMS} component={Teams}/>
                    <PrivateRoute path={ROUTES.TEAM_HOME} component={TeamHome}/>
                    <PrivateRoute path={ROUTES.NOTIFICATIONS} component={Notifications} />
                    <Route path="/t/:id" component={TeamPage}/>
                    <Route path="/scrim/:id" component={ScrimPage}/>
                </Switch>
            </div>
        )
    }
}

export default App;
