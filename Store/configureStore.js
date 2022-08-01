//import { combineReducers, createStore } from "redux";
import { createStore } from "redux";
import toggleFavorite from "./Reducer/favoriteReducer";
import setAvatar from "./Reducer/avatarReducer";
import AsyncStorage from '@react-native-community/async-storage';

import { persistCombineReducers } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
//const rootPersistConfig = { key: 'root', storage: storage }
const rootPersistConfig = { key: 'root', storage: AsyncStorage }


//export default createStore(combineReducers({ toggleFavorite, setAvatar }));
export default createStore(persistCombineReducers(rootPersistConfig, { toggleFavorite, setAvatar }));
