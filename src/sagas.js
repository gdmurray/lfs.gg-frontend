import {fork} from "redux-saga/effects";
import watchNotifications from "./app/Notifications/ducks/sagas";
import watchUser from "./app/User/ducks/sagas";
import watchAuth from "./app/Auth/ducks/sagas";
import watchTeams from "./app/Teams/ducks/sagas";
import watchTeamSettings from "./app/TeamSettings/ducks/sagas";

export default function* startForman() {
    yield fork(watchAuth);
    yield fork(watchNotifications);
    yield fork(watchUser);
    yield fork(watchTeams);
    yield fork(watchTeamSettings);
}
