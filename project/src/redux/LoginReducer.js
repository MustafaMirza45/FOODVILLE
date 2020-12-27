import * as ActionTypes from './ActionTypes';

const initialState = {
        loggedIn:false,
        user : null,
        Id: null,
        error : false
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      console.log('YE PAYLOAD IN REDUCER ' + action.payload.ErrorMessage)
      if (action.payload.ErrorMessage) 
      {
        return {
          ...state,
          loggedIn: false,
          user: action.payload.user,  //fetched data action 
          Id : action.payload.ID,
          error : action.payload.ErrorMessage  //ye backend wala error hai T/F
        };
      }
      else 
      {
        return {
          ...state,
          loggedIn: true,
          user: action.payload.user,  //fetched data action 
          Id : action.payload.ID,
          error : action.payload.ErrorMessage  //ye backend wala error hai T/F
        };
      }
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn : false,
        user : null,
        Id: null,
        error : action.payload.errmess //ye fetch wala error hai 
      };
      case ActionTypes.LOGOUT:
        return {
          ...state,
          loggedIn : false,
          user : null,
          Id: null,
          error : false
        };
    default:
      return state
  }
}
export default LoginReducer;