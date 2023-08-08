import React, { useContext } from "react";
import PropTypes from "prop-types";
import SwitchComponent from "./SwitchComponent";
import { Context, Modes} from "../State";
import "./Next.scss";

import axios from "axios";
import Endpoints from "../Endpoints.js";





const Next = ({ disabledConditions = false }) => {
	const [state, dispatch] = useContext(Context);

		
	const isNextDisabled = (state) => {
		switch (state.mode) {
			case "Name":
				if (!state.firstName || !state.lastName) return true;
				return false;
			case "Phone":
				if (state.rawPhoneNumber.length !== 10 || state.formattedPhoneNumber === "") return true;
				return false;
			case "Submit":
				return false;
			case "End":
				return true;
			default:
				return false;
		}
	};

	const currentStateIndex = Modes.indexOf(state.mode);

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
