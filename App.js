
//import { StatusBar } from "expo-status-bar";
import React from "react";
//import { StyleSheet, Text, View } from "react-native";
//import Search from "./components/Search";
//########################################################
//import Navigation from "./Navigation/Navigation";
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from "@react-navigation/stack";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FilmDetail from "./components/FilmDetail";
import Search from "./components/Search";
//########################################################
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import Navigation from "./Navigation/Navigation";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


//const SearchStackNavigator = createStackNavigator();

export default class App extends React.Component {
  render() {
    let persistor = persistStore(Store);
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
  /*
   */
}
