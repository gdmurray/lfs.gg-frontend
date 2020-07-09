export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const refreshPermissions = (props) => {
    if (Object.keys(props.permissions.data).length === 0) {
        console.debug("Refreshing Perms because Perms is empty")
        return true;
    }else if (props.permissions.data.team_id !== props.activeTeam){
        console.debug("Refreshing Perms because Team has Changed")
        return true;
    }else if(props.permissions.error){
        console.debug("Refreshing Perms because shit is broken")
        return true;
    }else{
        return false;
    }
}
