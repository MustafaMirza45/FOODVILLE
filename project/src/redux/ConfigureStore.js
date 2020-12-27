import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Managers } from './managers';
import {createForms} from 'react-redux-form';
import { Restaurant } from './restaurant';
import { LoginReducer } from './LoginReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialRegister,InitialUserRegister,RestaurantRegister  } from './forms';
import { Users } from './users';
import {Regreducer} from './registerreducer';


export const ConfigureStore = () => {
    const store = createStore(
       
       combineReducers({
         managers: Managers,
         restaurants: Restaurant,
         login: LoginReducer,
         users: Users,
         registeration: Regreducer,
         ...createForms({
            register: InitialRegister,
            userregister: InitialUserRegister,
            restaurant: RestaurantRegister
         })
       }) ,composeWithDevTools(applyMiddleware(thunk,logger))
       

    );
    return store;
    
}
