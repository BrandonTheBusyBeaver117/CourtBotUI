import React from "react";

export const Modes = ["Name", "Phone", "Submit", "End"];

export const isNextDisabled = (state) => {
	switch (state.mode) {
		case "Name":
			if (state.name === "" || state.appearances.length === 0) return true;
			return false;
		case "Phone":
			if (state.phoneNumber.length !== 10) return true;
			return false;
		case "Submit":
			return false;
		case "End":
			return true;
		default:
			return false;
	}
};

export const initialState = {
	name: "",
	appearances: [],
	phoneNumber: "",
	mode: Modes[0],
};

export const Context = React.createContext(initialState);

export const reducer = (state, action) => {
	switch (action.type) {
		case "nextMode":
			return {
				...state,
				mode: Modes[Modes.indexOf(state.mode) + 1],
			};
		case "prevMode":
			return {
				...state,
				mode: Modes[Modes.indexOf(state.mode) - 1],
			};
		case "set":
			return {
				...state,
				[action.prop]: action.val,
			};
		case "reset":
			return {
				...initialState,
			};
		default:
			console.log("Something terrible has happened, your action is invalid");
			console.log(action);
	}
};

export const Provider = ({ children, customInitialState = initialState }) => {
	const [state, dispatch] = React.useReducer(reducer, customInitialState);

	return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};
