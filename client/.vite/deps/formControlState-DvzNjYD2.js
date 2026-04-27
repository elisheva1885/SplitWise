//#region node_modules/@mui/material/FormControl/formControlState.mjs
function formControlState({ props, states, muiFormControl }) {
	return states.reduce((acc, state) => {
		acc[state] = props[state];
		if (muiFormControl) {
			if (typeof props[state] === "undefined") acc[state] = muiFormControl[state];
		}
		return acc;
	}, {});
}
//#endregion
export { formControlState as t };

//# sourceMappingURL=formControlState-DvzNjYD2.js.map