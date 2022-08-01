const initialState = { favoritesFilm: [] };
function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteFilmIndex = state.favoritesFilm.findIndex(
        (item) => item.id === action.value.id
      );
      if (favoriteFilmIndex !== -1) {
        //suppression
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter(
            (item, index) => index !== favoriteFilmIndex
          ),
        };
      } else {
        //ajout
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value],
        };
      }
      console.log("Here is the reducer state", nextState);
      //console.log("i m here");
      return nextState || state;

    default:
      //console.log("i m hereeee");
      return state;
    //break;
  }
}
export default toggleFavorite;
