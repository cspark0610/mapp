export default (state, action) => {
	switch (action.type) {
		case "ADD_MOVIE_TO_FAVORITES":
			return {
				...state,
				favorites: [...state.favorites, action.payload],
			};
		case "DELETE_MOVIE_FROM_FAVORITES":
			return {
				...state,
				favorites: state.favorites.filter((movie) => movie.id !== action.payload),
			};
		default:
			return state;
	}
};
