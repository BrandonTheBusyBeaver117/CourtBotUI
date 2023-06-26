import React from "react";

export const Modes = ["Name", "Phone", "Submit"];

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
			console.log("yo");
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
	}
};

export const Provider = ({ children, customInitialState = initialState }) => {
	const [state, dispatch] = React.useReducer(reducer, customInitialState);

	return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};
