export default (state, action) => {
	switch (action.type) {
		case "ADD_MOVIE":
			return {
				...state,
				movies: [...state.movies, action.payload],
			};
		case "CANCEL_MOVIE":
			return {
				...state,
				movies: state.movies.filter((movie) => movie.id !== action.payload),
			};
		default:
			return state;
	}
};
