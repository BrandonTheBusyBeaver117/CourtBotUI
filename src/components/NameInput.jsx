import React, { useState, useEffect, useContext } from "react";
import Endpoints from "../Endpoints.js";
import MockData from "../MockData.js";
import axios from "axios";
import Select from "react-select";
import Next from "./Next";
import { Context } from "../State";
import "./NameInput.scss";
import Back from "./Back.jsx";

/** Component to take in and return names */
export default function NameInput() {
	const [state, dispatch] = useContext(Context);

	console.log(state);

	/** List of all names in a {value, label} format*/
	const [allNames, setAllNames] = useState([]);

	/** Grabs names when component is mounted */
	useEffect(() => {
		/**
		 * Creates a list all names in a {value, label} format by iterating over
		 * the array and creating objects based on each value
		 * @param {String[]} names A list of names
		 */
		const createSelectObjects = (names) => {
			return names.map((name) => ({ value: name, label: name }));
		};

		if (MockData.useMockData) {
			setAllNames(createSelectObjects(MockData.mockNames));
		} else {
			(async () => {
				axios
					.get(Endpoints.getAllNames)
					.then((response) => {
						console.log(response);
						// Checking for errors
						if (response.status !== 200) {
							alert("Something went wrong when trying to get names");
							return;
						}
						setAllNames(createSelectObjects(response.data[Endpoints.allNamesKey]));
					})
					.catch((error) => console.log(error));
			})();
		}
	}, []);

	/**
	 * Handles a search by making an api request to get the appearances
	 * @param {String} firstName
	 * @param {String} lastName
	 */
	const handleSearch = async (firstName, lastName) => {
		// Making that api call to get appearances
		axios
			.get(Endpoints.getAppearances, {
				headers: {
					fname: firstName,
					lname: lastName,
				},
			})
			.then((response) => {
				console.log(response);
				// Checking for errors
				if (response.status !== 200) {
					alert("Something went wrong when trying to get appearances for this person.");
					return;
				}

				// Setting the court appearances

				dispatch({ type: "set", prop: "appearances", val: response.data[Endpoints.appearanceKey] });
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="nameInput">
			<p>Enter your first and last name</p>
			<div className="results">
				<Select
					options={allNames}
					onChange={(name) => {
						dispatch({ type: "set", prop: "appearances", val: [] });
						dispatch({ type: "set", prop: "name", val: name });

						// If we want to use mock data, just use the mock appearances
						if (MockData.useMockData) {
							dispatch({ type: "set", prop: "appearances", val: MockData.mockAppearances });
							return;
						}

						// Otherwise, handle search normally
						handleSearch(name.split(" "));
					}}
					isSearchable={true}
					placeholder="Jane Doe"
					noOptionsMessage={() => "Nobody found with that name"}
				/>
			</div>
			<Back />
			<Next
				disabledConditions={(() => {
					if (state.appearances.length === 0 || state.name === "") return true;
					return false;
				})()}
			></Next>
		</div>
	);
}
