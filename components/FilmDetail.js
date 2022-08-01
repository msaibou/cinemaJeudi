import moment from "moment";
import numeral from "numeral";

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Button,
  Share,
  Platform,
  TouchableOpacity,
} from "react-native";

import { connect } from "react-redux";
import EnlargeShrink from "../animations/enlargeShrink";

import { getFilmDetailFromApi, getImageFromApi } from "../API/TMDBApis";

class FilmDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    //console.log(navigation);
    const { params } = navigation.state;
    //console.log(params);
    if (params.idFilm != undefined && Platform.OS === "ios") {
      //console.log(film);
      return {
        headerRight: (
          <TouchableOpacity
            style={styles.share_touchable_floatingactionbutton}
            onPress={() => params.shareFilm()}
          >
            <Text>Hello</Text>
            <Image
              style={styles.share_image}
              source={require("../assets/ic_share.png")}
            />
          </TouchableOpacity>
        ),
      };
    }
  };
  constructor(props) {
    super(props);
    this.state = { film: undefined, isLoading: true };
    this._shareFilm = this._shareFilm.bind(this);
  }
  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.idFilm,
    });
  }
  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(
      //(item) => item.id === this.props.navigation.state.params.idFilm
      (item) => item.id === this.props.route.params.idFilm
    );
    if (favoriteFilmIndex !== -1) {
      this.setState(
        {
          film: this.props.favoritesFilm[favoriteFilmIndex],
          isLoading: false,
        },
        () => {
          this._updateNavigationParams();
        }
      );

      return;
    }

    //console.log("idFilm : " + this.props.navigation.state.params.Film.id);
    this.setState({ isLoading: true });
    getFilmDetailFromApi(
      this.props.route.params.idFilm
      //this.props.navigation.state.params.Film.id.toString()
    ).then((data) => {
      //console.log(data);
      this.setState({ film: data, isLoading: false }, () => {
        this._updateNavigationParams();
      });
    });
  }

  _shareFilm() {
    const { film } = this.state;
    Share.share({ title: film.title.toString(), message: film.overview.toString() });
  }
  _displayFloatingActionButton() {
    const { film } = this.state;
    if (film != undefined && Platform.OS === "android") {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}
        >
          <Image
            style={styles.share_image}
            source={require("../assets/ic_share.png")}
          />
        </TouchableOpacity>
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
  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
  }
  _displayFavBtn() {
    //this.props.favoritesFilm.id === film.id
    //console.log(this.props.favoritesFilm.map((movie) => movie.id));
    // console.log(this.state.film.id);
    /*  console.log(
      "Exist : " +
        this.props.favoritesFilm
          .map((movie) => movie.id)
          .includes(this.state.film.id)
    );
*/
    /*.map((myFilm) => {
        myFilm;
      }) */
    if (
      this.props.favoritesFilm
        .map((movie) => movie.id)
        .includes(this.state.film.id)
    ) {
      return (
        <EnlargeShrink shouldEnlarge={true}>
          <Image
            style={styles.favImg}
            source={require("../assets/15187653912696_ic_favorite.png")}
          />
        </EnlargeShrink>
      );
    } else {
      return (
        <EnlargeShrink shouldEnlarge={false}>
          <Image
            style={styles.favImg}
            source={require("../assets/15187654148852_ic_favorite_border.png")}
          />
        </EnlargeShrink>
      );
    }
  }
  componentDidUpdate() {
    //console.log(this.props.favoritesFilm);
  }
  _displayFilm() {
    const film = this.state.film;
    //console.log(film);
    if (film != undefined) {
      //console.log(film.poster_path);
      //console.log(getImageFromApi(film.poster_path));
      //console.log(getImageFromApi(film.backdrop_path));
      return (
        <ScrollView style={styles.scrollView_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path) }}
          />

          <Text style={styles.filmTitle}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favButton}
            onPress={() => this._toggleFavorite()}
          >
            {this._displayFavBtn()}
          </TouchableOpacity>
          {/*
          
          <Button title="Favoris" onPress={() => this._toggleFavorite()} />
          */}
          <Text style={styles.filmDesc}>{film.overview}</Text>
          <Text style={styles.filmInfo}>
            Sorti le {moment(film.release_date).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.filmInfo}>Note : {film.vote_average}</Text>
          <Text style={styles.filmInfo}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.filmInfo}>
            Budget : {numeral(film.budget).format("$0.00")}
          </Text>
          <Text style={styles.filmInfo}>
            Genre(s) : {film.genres.map((genre) => genre.name).join(" / ")}
          </Text>

          <Text style={styles.filmInfo}>
            Companie(s) :{" "}
            {film.production_companies
              .map((companie) => companie.name)
              .join(" / ")}
          </Text>
        </ScrollView>
      );
    }
  }

  render() {
    //const Film = this.props.navigation.state.params.Film;
    //console.log(this.props);
    return (
      <View style={styles.main}>
        {/*<Text>Détail du film {Film.title.toString()}</Text> */}
        {/*{this._displayFilm()} */}
        {this._displayFilm()}
        {this._displayLoading()}
        {this._displayFloatingActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  loading_container: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView_container: {
    flex: 1,
  },
  image: { height: 220, margin: 5, backgroundColor: "gray" },
  favButton: { alignItems: "center" },
  favImg: {
    flex: 1,
    //width: "100%",
    width: null,
    height: null,
  },
  filmTitle: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    flexWrap: "wrap",
  },
  filmDesc: {
    fontSize: 15,

    margin: 5,
  },
  filmInfo: {
    margin: 5,
    fontWeight: "bold",
  },
  share_touchable_floatingactionbutton: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
  },
  share_image: { width: 30, height: 30 },
});
const mapStateToProps = (state) => {
  return { favoritesFilm: state.toggleFavorite.favoritesFilm };
};
export default connect(mapStateToProps)(FilmDetail);
