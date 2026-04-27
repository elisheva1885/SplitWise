import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
import { Dr as require_prop_types, N as DefaultPropsProvider$1, P as useDefaultProps$1, Qt as useTheme$1, Zt as GlobalStyles$1, ct as createStyled, in as require_jsx_runtime } from "./system-LV-kAkiu.js";
import { n as createTheme, t as identifier_default } from "./identifier-BdUl8pSy.js";
//#region node_modules/@mui/material/styles/defaultTheme.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var defaultTheme = createTheme();
//#endregion
//#region node_modules/@mui/material/styles/useTheme.mjs
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useTheme() {
	const theme = useTheme$1(defaultTheme);
	import_react.useDebugValue(theme);
	return theme["$$material"] || theme;
}
//#endregion
//#region node_modules/@mui/material/GlobalStyles/GlobalStyles.mjs
function GlobalStyles(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles$1, {
		...props,
		defaultTheme,
		themeId: identifier_default
	});
}
GlobalStyles.propTypes = { 
/**
* The styles you want to apply globally.
*/
styles: import_prop_types.default.oneOfType([
	import_prop_types.default.array,
	import_prop_types.default.func,
	import_prop_types.default.number,
	import_prop_types.default.object,
	import_prop_types.default.string,
	import_prop_types.default.bool
]) };
//#endregion
//#region node_modules/@mui/material/styles/slotShouldForwardProp.mjs
function slotShouldForwardProp(prop) {
	return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
//#endregion
//#region node_modules/@mui/material/styles/rootShouldForwardProp.mjs
var rootShouldForwardProp = (prop) => slotShouldForwardProp(prop) && prop !== "classes";
//#endregion
//#region node_modules/@mui/material/styles/styled.mjs
var styled = createStyled({
	themeId: identifier_default,
	defaultTheme,
	rootShouldForwardProp
});
//#endregion
//#region node_modules/@mui/material/zero-styled/index.mjs
function globalCss(styles) {
	return function GlobalStylesWrapper(props) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles, { styles: typeof styles === "function" ? (theme) => styles({
			theme,
			...props
		}) : styles });
	};
}
//#endregion
//#region node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.mjs
function DefaultPropsProvider(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultPropsProvider$1, { ...props });
}
DefaultPropsProvider.propTypes = {
	/**
	* @ignore
	*/
	children: import_prop_types.default.node,
	/**
	* @ignore
	*/
	value: import_prop_types.default.object.isRequired
};
function useDefaultProps(params) {
	return useDefaultProps$1(params);
}
//#endregion
export { slotShouldForwardProp as a, rootShouldForwardProp as i, globalCss as n, useTheme as o, styled as r, useDefaultProps as t };

//# sourceMappingURL=DefaultPropsProvider-Do4ow9hG.js.map