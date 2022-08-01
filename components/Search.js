import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from "react-native";

//import films from "../Helpers/filmsData";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApis";
import { CommonActions } from "@react-navigation/native";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { films: [], isLoading: false };
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    this._loadFilms = this._loadFilms.bind(this);
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }
  _loadFilms() {
    this.setState({ isLoading: true });
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          //console.log("====================================");
          //console.log("totalPages : " + data.total_pages);
          //console.log("====================================");
          (this.page = data.page),
            (this.totalPages = data.total_pages),
            this.setState({
              films: [
                ...this.state.films,
                ...data.results,
              ] /*films: data.results, */,
              isLoading: false,
            });
          Keyboard.dismiss();
        }
      );
    }
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator color="#E7E7E7" size="large" />
        </View>
      );
    }
  }
  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({ films: [] }, () => {
      //console.log("====================================");
      /*console.log(
        "Page : " +
          this.page +
          " / TotalPages : " +
          this.totalPages +
          " / Nombre de films : " +
          this.state.films.length
      );*/
      //console.log("====================================");
      this._loadFilms();
    });
  }
  _displayDetailForFilm = (Film) => {
    //console.log("My test Film :" + Film.id);
    this.props.navigation.navigate("FilmDetail", { idFilm: Film.id });
    /*this.props.navigation.dispatch(
      CommonActions.navigate({
        name: 'FilmDetail',
        params: { Film: Film }
      }));*/

  };
  render() {
    //console.log(this.state.isLoading);
    return (
      <View style={styles.main}>
        <TextInput
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
          placeholder="Titre du film"
          style={styles.textinput}
        />
        <Button
          title="Rechercher"
          style={styles.btn}
          onPress={() => this._searchFilms()}
        />

        <FlatList
          data={this.state.films}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              //console.log("End reached!!");
              this._loadFilms();
            }
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
        />
        {this._displayLoading()}

        {/*
        <FlatList
          data={[{ key: "a" }, { key: "b" }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
        <FlatList
          data={films}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem />}
        />

        
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
        */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: { flex: 1 /*marginTop: 20 // géré par react-navigation*/ },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    height: 50,
  },
});

export default Search;
