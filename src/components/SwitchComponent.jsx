import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../State";

const SwitchComponent = ({ action, isDisabled, label }) => {
	const [, dispatch] = useContext(Context);

	console.log(action);
	return (
		<button
			disabled={isDisabled}
			onClick={() => dispatch({ type: action })}
		>
			{label}
		</button>
	);
};

SwitchComponent.propTypes = {
	action: PropTypes.oneOf(["nextMode", "prevMode"]),
	isDisabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

export default SwitchComponent;
