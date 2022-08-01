// Components/FilmItem.js

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { connect } from "react-redux";

import { TouchableOpacity } from "react-native-gesture-handler";
import { getImageFromApi } from "../API/TMDBApis";
import FadeIn from "../animations/fadeIn";

//import Animated from "react-native-reanimated";
class FilmItem extends React.Component {
  _isFav(list, idFilm) {
    if (list.includes(idFilm)) {
      //console.log("Found :" + idFilm + " in : " + list.join("|"));
      return (
        <Image
          style={styles.favIco}
          source={require("../assets/15187653912696_ic_favorite.png")}
        />
      );
    } else {
      //console.log("Did'nt found : " + idFilm);
      return;
    }
  }
  render() {
    //  const film = this.props.film;
    //  const displayDetailForFilm=this.props.displayDetailForFilm;
    const { film, displayDetailForFilm } = this.props;
    //console.log(this.props.favoritesFilm.map((movie) => movie.id));
    //console.log("Test this id : " + film.id);
    //console.log("list : " + this.props.favoritesFilm.map((movie) => movie.id));

    /*let favIco = undefined;
    if (!this.props.favoritesFilm.findIndex((movie) => movie.id === film.id)) {
      favIco = (
        <Image
          style={styles.favIco}
          source={require("../assets/15187653912696_ic_favorite.png")}
        />
      );
      
      console.log("found it here!!");
    } else {
      console.log("did'nt found it here!!");
    }*/
    console.log("################################");
    console.log("Here is a test", this.props.favoritesFilm);
    console.log("################################");
    return (
      <FadeIn>
        <TouchableOpacity
          onPress={() => displayDetailForFilm(film)}
          style={styles.main_container}
        >
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.poster_path) }}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>

              {this._isFav(
                this.props.favoritesFilm.map((movie) => movie.id),
                film.id
              )}
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>
                {film.overview}
              </Text>
              {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  favIco: { width: 40, height: 40 },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});

//export default FilmItem;

const mapStateToProps = (state) => {
  return { favoritesFilm: state.toggleFavorite.favoritesFilm };
};
export default connect(mapStateToProps)(FilmItem);
