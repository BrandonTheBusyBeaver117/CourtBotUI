import React, { useState, useEffect, useContext} from "react";
import Endpoints from "../Endpoints.js";
import MockData from "../MockData.js";
import axios from "axios";
//import Select from "react-select";
import { Context } from "../State";
import "./NameInput.scss";


/** Component to take in and return names */
export default function NameInput() {
	const [state, dispatch] = useContext(Context);

	const [firstName, setFirstName] = useState(state.firstName)
	const [lastName, setLastName] = useState(state.lastName)

	useEffect(() => {

		const unsavedChanges = firstName !== state.firstName || lastName !== state.lastName

		dispatch({ type: "set", prop: "unsavedChanges", val: unsavedChanges });

	}, [firstName, lastName])


	return (
		<div className="nameInput input-component">
			<p>Enter your first and last name</p>
			<div className="results">
				<label>
					First Name:
				</label>
				<input
					placeholder="Jane"
					onChange = {event => {
						setFirstName(event.target.value)
					}}
					value = {firstName}
				/>

				<label>
					Last Name:
				</label>
				<input
					placeholder="Doe"
					onChange = {event => {
						setLastName(event.target.value)
					}}
					value = {lastName}
				/>



				<button onClick = {() => {
					axios
					.get(`${Endpoints.getRandom}`)
					.then((response) => {

						console.log(response)
						
						
						dispatch({ type: "set", prop: "appearances", val: response.data});
						dispatch({ type: "nextMode"})
					})
					.catch((error) => {
						console.log(error)
						alert("rip")
					});
				}}>
					Random cases
				</button>


				<button
					className = "submit-button"
					
					onClick = {() => {
						
						if(!firstName || !lastName) alert("You must input both first and last names!")
		
						// Do we need await?
						axios
							.get(`${Endpoints.getAppearances}?first=${firstName}&last=${lastName}`)
							.then((response) => {
													
								// Checking for errors
								if (Object.keys(response.data).length === 0) {
									alert(`"${firstName} ${lastName}" was not found in our database`);
									console.log(response)
									return;
								} else {
									alert("Success")
								}

								// New name to be saved
								dispatch({ type: "set", prop: "firstName", val: firstName})
								dispatch({ type: "set", prop: "lastName", val: lastName})

								// Setting the court appearances
								dispatch({ type: "set", prop: "appearances", val: response.data});
							})
						.catch((error) => {
							console.log(error)
							alert("rip")
						});
					}}
				>
					Submit
				</button>
				
				
				{/* <Select
					options={allNames}
					defaultInputValue={state.name}
					onChange={(name) => {
						if (name.value === state.name) return;

						dispatch({ type: "set", prop: "appearances", val: [] });
						dispatch({ type: "set", prop: "name", val: name.value });

						// If we want to use mock data, just use the mock appearances
						if (MockData.useMockData) {
							dispatch({ type: "set", prop: "appearances", val: MockData.mockAppearances });
							return;
						}

						// Otherwise, handle search normally
						handleSearch(name.value.split(" "));
					}}
					isSearchable={true}
					placeholder="Jane Doe"
					noOptionsMessage={() => "Nobody found with that name"}
				/> */}
			</div>
		</div>
	);
}
