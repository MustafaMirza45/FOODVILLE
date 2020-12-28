import * as ActionTypes from './ActionTypes';

const initialState = {
    FName : null,
    LName : null,
    imgsrc : null,
    Address : null,
    errMess : null,
    lat : null,
    lon: null,
    currAddress: null
}

export const User_Profile_Reducer = (state = initialState , action) =>
{
    switch(action.type)
    {
        case(ActionTypes.LOAD_USER_PROFILE) :
        return{
            ...state,
            FName : action.payload.FirstName,
            LName : action.payload.LastName,
            imgsrc : action.payload.imgsrc,
            Address : action.payload.address

        };
        case ActionTypes.USER_DISPLAY_FAIL:
        return {
            ...state,
            FName : null,
            LName : null,
            imgsrc : null,
            Address : null,
            errMess : action.payload.errMess
         };
         case ActionTypes.GET_CURR_USER_ADDRESS :
        return{
                 ...state,
                 currAddress : action.payload.address,
                 lat : action.payload.mapPosition.lat,
                 lon : action.payload.mapPosition.lng

        };
        case ActionTypes.DP_UPLOAD:
            return state
        case ActionTypes.DP_UPLOAD_FAIL :
            return{
                ...state,
                errMess :action.payload
            };
        case ActionTypes.SET_LOCATION:
        
            return state
        case ActionTypes.SET_LOCATION_FAILED:

            return state
        default:
        return state
    }

}

export default User_Profile_Reducer