import React, {Component} from 'react';
import {Route, Switch} from 'react-router'
import './App.css';
import {ROUTES} from "./utils/routes";
import HomePageLogic from "./app/Dashboard/HomePageLogic";
import Login from "./app/Auth/Login";
import Register from "./app/Auth/Register";
import TeamCreate from "./app/Teams/CreateTeam";
import Teams from "./app/Teams/UserTeamsList";
import PrivateRoute from "./app/common/PrivateRoute";
import TeamHome from "./app/Teams/TeamHome";
import TeamPage from "./app/Teams/TeamPage";
import ScrimPage from "./app/Scrims/ScrimPage";
import Invitation from "./app/Notifications/Invitation";
import Notifications from "./app/Notifications/Notifications";

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
