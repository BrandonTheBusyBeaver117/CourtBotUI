import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../State";

const SwitchComponent = ({ action, isDisabled, label, className = "" }) => {
	const [, dispatch] = useContext(Context);

	return (
		<button
			className={`switch ${className}`}
			disabled={isDisabled}
			onClick={() => dispatch({ type: action })}
		>
			{label}
		</button>
	);
};

SwitchComponent.propTypes = {
	action: PropTypes.oneOf(["nextMode", "prevMode"]).isRequired,
	isDisabled: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default SwitchComponent;
