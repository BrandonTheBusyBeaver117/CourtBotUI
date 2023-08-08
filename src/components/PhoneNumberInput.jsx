import React, { useEffect, useContext, useRef, useState} from "react";
import { Context } from "../State";
import "./PhoneNumberInput.scss";

export default function PhoneNumberInput() {
	const [state, dispatch] = useContext(Context);

	const desiredCursorPosition = useRef(null);

	const [prettifiedPhoneNumber, setPrettifiedPhoneNumber] = useState(state.prettifiedPhoneNumber)

	useEffect(() => {

		console.log(prettifiedPhoneNumber)
							
		if(prettifiedPhoneNumber.length === 5 && prettifiedPhoneNumber.includes(" ")){
			const firstSpace = prettifiedPhoneNumber.indexOf(" ")

	
			phoneRef.current.setSelectionRange(firstSpace, firstSpace)
			console.log("Set to first space at pos: " + firstSpace)
		}

		if(desiredCursorPosition.current) {
	
			console.log("I am setting cursor pos: " + desiredCursorPosition.current)
			phoneRef.current.setSelectionRange(desiredCursorPosition.current, desiredCursorPosition.current)
			desiredCursorPosition.current = null
		}

		console.log("end of useeffect")

	}, [prettifiedPhoneNumber])


	const phoneRef = useRef();
	const formatPhoneNumber = (currentInput) => {

		// Getting rid of non-numbers
		let formattedNumber = currentInput.replaceAll(/[^0-9]/g, '')

		console.log("clean: " + formattedNumber)
		

		if(!currentInput.includes(")") && formattedNumber.length === 3) {
			formattedNumber = formattedNumber.slice(0,2)
			desiredCursorPosition.current = 3
		} 
	
		if(!currentInput.includes("(")) desiredCursorPosition.current = 1;


		if(formattedNumber.length <= 3){
			formattedNumber = "(" + formattedNumber + " ".repeat(3 - formattedNumber.length) +  ")"
		} else if (formattedNumber.length <= 6){
			formattedNumber = "(" + formattedNumber.slice(0,3) + ") " + formattedNumber.slice(3) 
		} else{
			formattedNumber = "(" + formattedNumber.slice(0,3) + ") " + formattedNumber.slice(3, 6) + "-" + formattedNumber.slice(6, 10)
		} 	

		return formattedNumber
	}

	return (
		<div className="phoneNumberInput input-component">
			<p>Enter your phone number down below:</p>
			<div className="phoneWrapper">
				<input className=""  
						ref = {phoneRef} 
						onChange={(event) => {

							console.log("\n")

							console.log(event.target.value)

							const updatedPrettifiedNumber = formatPhoneNumber(event.target.value)

							setPrettifiedPhoneNumber(updatedPrettifiedNumber)
							
							const rawNumber = updatedPrettifiedNumber.replaceAll(/[^0-9]/g, '')

							if(rawNumber.length === 10) {
								dispatch({ type: "set", prop: "rawPhoneNumber", val: rawNumber})
								dispatch({ type: "set", prop: "prettifiedPhoneNumber", val: updatedPrettifiedNumber})
							}

							console.log("End of on change")

						}}
						type = "text"
						placeholder="(408) 123-4567"
						value = {prettifiedPhoneNumber}
				>
				
				
				</input>
			</div>
		</div>
	);
}
