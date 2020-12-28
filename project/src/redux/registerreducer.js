
import * as ActionTypes from './ActionTypes';

export const Regreducer =(state = {
   
    minsert: true,
    memail:true,
    uemail:true,
    sent:false,
   uinsert: true
}, action) =>{
    switch(action.type){

        case ActionTypes.SEND_MANAGER:
            
                return{...state,minsert: action.payload.Insert,memail: action.payload.email,sent:action.payload.sent};     
               
        case ActionTypes.SEND_MANAGER_FAILED:
                
                return state;
        case ActionTypes.SEND_USER:
    
            return{...state,uinsert: action.payload.Insert,uemail: action.payload.email,sent:action.payload.sent};     
            
        case ActionTypes.SEND_USER_FAILED:
            
            return state;
        case ActionTypes.RESET:
            return {...state,uinsert: true,uemail: true,sent: false,memail:true,minsert:true};     
        default:
            return state;
    }
}