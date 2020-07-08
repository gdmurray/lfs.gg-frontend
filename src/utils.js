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
        return true;
    }else if (props.permissions.data.team_id !== props.activeTeam){
        return true;
    }else if(props.permissions.error){
        return true;
    }else{
        return false;
    }
}
