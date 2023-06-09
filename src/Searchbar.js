import React, { useEffect, useRef, useState } from "react";

export default function Searchbar(props) {
	const [searchbarValue, setSearchbarValue] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [clickedInsideSearchbar, setClickedInsideSearchbar] = useState(false);

	// Thanks to Ben Bud's answer for inspiration
	// Solution found at https://stackoverflow.com/a/42234988

	const lastClickedClassName = useRef("");
	useEffect(() => {
		function handleClickOutside(event) {
			const isPrevClickInside = lastClickedClassName.current === "insideSearchbar";
			const isCurrentClickInside = event.target.className === "insideSearchbar";

			if (isPrevClickInside && !isCurrentClickInside) {
				console.log("click outside");
				setClickedInsideSearchbar(false);
			} else if (!isPrevClickInside && isCurrentClickInside) {
				console.log("Click inside");
				setClickedInsideSearchbar(true);
			}

			lastClickedClassName.current = event.target.className;
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	/**
        When there's a change to the searchbar, this function will run
        It works to filter through the names and return matches
    */
	const handleChange = (names, inputValue, isClickedInsideSearchbar) => {
		//console.log(inputValue)

		// Is there a response? OR The user has clicked outside the searchbar
		if (inputValue.length < 1 || !isClickedInsideSearchbar) {
			// Show no results
			return [];
		}

		// All the names that match
		const results = [];

		// Makes sure that the searchbar input only has letters
		if (/^[a-z]+$/i.test(inputValue)) {
			// Were there any results found?
			let anyResultFound = false;

			// Traverses through all the names
			for (const name of names) {
				// .slice takes the length of the name to compare to the input value
				// If they are equal, then it's a match, and it's a possible result
				if (name.slice(0, inputValue.length) === inputValue) {
					// We did find a result
					anyResultFound = true;

					// Push the result
					results.push(
						<p
							key={name}
							// onClick={() => handleResultClick(teamNumber)}
							className="insideSearchbar"
						></p>
					);
				}
			}

			if (anyResultFound) {
				// If there's any results, return them
				return results;
			} else {
				//If there's no result found, then there will be this error message
				return <p className="insideSearchbar">No one found with that name</p>;
			}
		}
	};

	return (
		<div className="searchbar">
			<input
				id="firstName"
				type="text"
				placeholder="First Name"
				value={firstName}
				onInput={(event) => setFirstName(event.target.value)}
				autoComplete="off"
				className="insideSearchbar"
			/>

			<input
				id="lastName"
				type="text"
				placeholder="Last Name"
				value={lastName}
				onInput={(event) => setLastName(event.target.value)}
				autoComplete="off"
				className="insideSearchbar"
			/>

			<div className="results">{handleChange(props.teamInformation, searchbarValue, clickedInsideSearchbar)}</div>
		</div>
	);
}
