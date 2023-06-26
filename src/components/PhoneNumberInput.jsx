import React, { useContext } from "react";
import { Context } from "../State";
import Back from "./Back";
import Next from "./Next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "./PhoneNumberInput.scss";

export default function PhoneNumberInput() {
	const [state, dispatch] = useContext(Context);

	return (
		<div className="phoneNumberInput">
			<p>Enter your phone number down below:</p>
			<div className="phoneWrapper">
				<PhoneInput
					id="phoneNumber"
					country={"us"}
					onlyCountries={["us"]}
					disableDropdown={true}
					disableCountryCode={true}
					onChange={(phoneNumber) => dispatch({ type: "set", prop: "phoneNumber", val: phoneNumber })}
					value={state.phoneNumber}
					placeholder="(408) 123-4567"
				/>
			</div>
			<Back />
			<Next
				disabledConditions={(() => {
					if (state.phoneNumber.length !== 10) return true;
					return false;
				})()}
			></Next>
		</div>
	);
}
