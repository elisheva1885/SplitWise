import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
import { Dr as require_prop_types, Er as clsx, Tr as composeClasses, in as require_jsx_runtime, mt as generateUtilityClass, pt as generateUtilityClasses } from "./system-LV-kAkiu.js";
import { r as styled, t as useDefaultProps } from "./DefaultPropsProvider-Do4ow9hG.js";
import { t as useFormControl } from "./useFormControl-BFECssuK.js";
import { t as formControlState } from "./formControlState-DvzNjYD2.js";
//#region node_modules/@mui/material/FormGroup/formGroupClasses.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
function getFormGroupUtilityClass(slot) {
	return generateUtilityClass("MuiFormGroup", slot);
}
var formGroupClasses = generateUtilityClasses("MuiFormGroup", [
	"root",
	"row",
	"error"
]);
//#endregion
//#region node_modules/@mui/material/FormGroup/FormGroup.mjs
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { classes, row, error } = ownerState;
	return composeClasses({ root: [
		"root",
		row && "row",
		error && "error"
	] }, getFormGroupUtilityClass, classes);
};
var FormGroupRoot = styled("div", {
	name: "MuiFormGroup",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.row && styles.row];
	}
})({
	display: "flex",
	flexDirection: "column",
	flexWrap: "wrap",
	variants: [{
		props: { row: true },
		style: { flexDirection: "row" }
	}]
});
/**
* `FormGroup` wraps controls such as `Checkbox` and `Switch`.
* It provides compact row layout.
* For the `Radio`, you should be using the `RadioGroup` component instead of this one.
*/
var FormGroup = /* @__PURE__ */ import_react.forwardRef(function FormGroup(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormGroup"
	});
	const { className, row = false, ...other } = props;
	const fcs = formControlState({
		props,
		muiFormControl: useFormControl(),
		states: ["error"]
	});
	const ownerState = {
		...props,
		row,
		error: fcs.error
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroupRoot, {
		className: clsx(useUtilityClasses(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
FormGroup.propTypes = {
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* Display group of elements in a compact row.
	* @default false
	*/
	row: import_prop_types.default.bool,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
export { FormGroup as default, formGroupClasses, getFormGroupUtilityClass };

//# sourceMappingURL=@mui_material_FormGroup.js.map