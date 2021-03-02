export default (state, action) => {
	const newAction = action.payload
	switch (action.type) {
		case "LOGIN":
			return{
				...state.user,
				user: newAction
			};
		case "LOGOUT":{
			return {
				...state,
				user: { }
			}
		}	
		default:
			return state;
	}
};
