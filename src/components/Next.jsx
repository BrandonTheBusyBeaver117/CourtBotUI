import React, { useContext } from "react";
import PropTypes from "prop-types";
import SwitchComponent from "./SwitchComponent";
import { Context, Modes, isNextDisabled } from "../State";
import "./Next.scss";

const Next = ({ disabledConditions = false }) => {
	const [state, dispatch] = useContext(Context);

	const currentStateIndex = Modes.indexOf(state.mode);
	console.log(state.mode);
	console.log(currentStateIndex);

	const isDisabled = (() => {
		if (currentStateIndex >= Modes.length - 1) return true;
		if (isNextDisabled(state)) return true;
		return disabledConditions;
	})();

	return (
		<SwitchComponent
			action="nextMode"
			isDisabled={isDisabled}
			label="Next"
			className="next"
		/>
	);
};

Next.propTypes = {
	disabledConditions: PropTypes.bool,
};
export default Next;
