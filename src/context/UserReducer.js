export default (state, action) => {
	//const {payload} = action
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
			};
		};
		case "GET_USER_BY_ID":{
			return {
				...state,
				user: newAction
			}
		}	
		default:
			return state;
	}
};
