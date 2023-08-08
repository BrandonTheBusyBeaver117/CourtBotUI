import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../State";

const SwitchComponent = ({ action, isDisabled, label, className = ""}) => {
	const [state , dispatch] = useContext(Context);

	return (
		<button
			className={`switch ${className}`}
			disabled={isDisabled}
			onClick={async () => {

				if(state.unsavedChanges &&
				   !window.confirm("You have unsaved changes! Do you still wish to proceed and lose your changes?")){
					return;
				}


				dispatch({ type: action })
				dispatch({ type: "set", prop: "unsavedChanges", val: false})
			}}
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
