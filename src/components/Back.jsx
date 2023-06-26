import React, { useContext } from "react";
import PropTypes from "prop-types";
import SwitchComponent from "./SwitchComponent";
import { Context, Modes } from "../State";

const Back = ({ disabledConditions = false }) => {
	const [state, dispatch] = useContext(Context);

	const currentStateIndex = Modes.indexOf(state.currentMode);

	const isDisabled = (() => {
		if (currentStateIndex <= 0) return true;
		return disabledConditions;
	})();

	console.log(state);
	console.log(state.currentMode);

	return (
		<SwitchComponent
			newState={currentStateIndex - 1}
			isDisabled={isDisabled}
			label="Back"
		/>
	);
};

Back.propTypes = {
	disabledConditions: PropTypes.bool,
};
export default Back;
