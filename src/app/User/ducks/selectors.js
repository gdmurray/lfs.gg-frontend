//export const activeTeam = (state) => {
//    return state !== undefined ? state.activeTeam : null;
//}

export function activeTeam(state) {
    if (state.userInfo.loading == false) {
        return state.userInfo.activeTeam
    }
    return null
}

export function userData(state) {
    if (state.userInfo.loading == false) {
        return state.userInfo.data
    }
    return null;
}

export function userTeams(state) {
    console.log(state);
    if (state.userInfo.loading == false) {
        return state.userInfo.data.teams;
    }
    return [];
}

export function userId(state) {
    if (state.userInfo.loading == false && state.userInfo.data !== undefined) {
        return state.userInfo.data.id
    }
    return null
}

export default {
    activeTeam,
    userTeams,
    userId,
    userData
};
