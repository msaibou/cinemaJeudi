const initialState = { userAvatar: require('../../assets/ic_tag_faces.png') };
function setAvatar(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case "SET_AVATAR":
            //ajout
            nextState = {
                ...state,
                userAvatar: action.value,
            };
            console.log("i m here old", state);
            console.log("i m here younger", nextState);
            return nextState || state;

        default:
            //console.log("i m hereeee");
            return state;
        //break;
    }
}
export default setAvatar;
