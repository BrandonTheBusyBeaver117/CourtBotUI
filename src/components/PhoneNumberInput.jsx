import React, { useContext } from "react";
import { Context } from "../State";
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
					onChange={(phoneNumber) => {
						dispatch({ type: "set", prop: "rawPhoneNumber", val: phoneNumber });
						dispatch({ type: "set", prop: "formattedPhoneNumber", val: "" });
						if (phoneNumber.length === 10) {
							const formattedPhoneNumber =
								phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3, 6) + "-" + phoneNumber.slice(6);
							dispatch({ type: "set", prop: "formattedPhoneNumber", val: formattedPhoneNumber });
						}
					}}
					value={state.phoneNumber}
					placeholder="(408) 123-4567"
				/>
			</div>
		</div>
	);
}
