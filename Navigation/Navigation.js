import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Search from "../components/Search";
import FilmDetail from "../components/FilmDetail";
import Favorites from "../components/Favorites";
import React from "react";
import { StyleSheet, Image } from "react-native";
import FilmList from "../components/FilmList";

const MoviesTabNavigator = createBottomTabNavigator();

const styles = StyleSheet.create({
  icon: { width: 30, height: 30 },
});


function SearchStack() {
  const SearchStackNavigator = createStackNavigator();
  return (<SearchStackNavigator.Navigator
    initialRouteName="Search"
    screenOptions={{ gestureEnabled: false }}
  >
    <SearchStackNavigator.Screen
      name="Search"
      component={Search}
      options={{ title: 'Rechercher' }}
    />
    <SearchStackNavigator.Screen
      name="FilmDetail"
      component={FilmDetail}
    />
  </SearchStackNavigator.Navigator>
  );
}

function FavoritesStack() {
  const FavoriteStackNavigator = createStackNavigator();
  return (
    <FavoriteStackNavigator.Navigator initialRouteName="FilmList" screenOptions={{ gestureEnabled: false }}>
      <FavoriteStackNavigator.Screen name="FilmList" component={Favorites} options={{ title: 'Mes favoris' }} />
      <FavoriteStackNavigator.Screen name="FilmDetail" component={FilmDetail} />
    </FavoriteStackNavigator.Navigator>
  );
}

function NewNavigation() {
  return (
    <NavigationContainer>
      <MoviesTabNavigator.Navigator
        initialRouteName="Search"
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
          activeBackgroundColor: "#DDD",
          inactiveBackgroundColor: "#FFF",
        }}
      >
        <MoviesTabNavigator.Screen name="Search" component={SearchStack} options={{
          tabBarIcon: () => {
            return (
              <Image
                source={require("../assets/ic_search.png")}
                style={styles.icon}
              />
            );
          }
        }} />
        <MoviesTabNavigator.Screen name="Favorites" component={FavoritesStack} options={{
          tabBarIcon: () => {
            return (
              <Image
                source={require("../assets/15187653912696_ic_favorite.png")}
                style={styles.icon}
              />
            );
          }
        }} />

      </MoviesTabNavigator.Navigator>
    </NavigationContainer>

  );
}
export default NewNavigation;