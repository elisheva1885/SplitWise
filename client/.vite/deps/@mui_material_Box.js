import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { Dr as require_prop_types, gt as ClassNameGenerator, ht as createBox, pt as generateUtilityClasses } from "./system-LV-kAkiu.js";
import { n as createTheme, t as identifier_default } from "./identifier-BdUl8pSy.js";
//#region node_modules/@mui/material/Box/boxClasses.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
//#endregion
//#region node_modules/@mui/material/Box/Box.mjs
var Box = createBox({
	themeId: identifier_default,
	defaultTheme: createTheme(),
	defaultClassName: boxClasses.root,
	generateClassName: ClassNameGenerator.generate
});
Box.propTypes = {
	/**
	* @ignore
	*/
	children: import_prop_types.default.node,
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
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
export { boxClasses, Box as default };

//# sourceMappingURL=@mui_material_Box.js.map