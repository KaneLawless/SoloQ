import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-EKATUG6S.js";
import {
  require_react
} from "./chunk-PMYDY72F.js";
import {
  __toESM
} from "./chunk-ZS7NZCD4.js";

// node_modules/react-bootstrap/esm/Spinner.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Spinner = React.forwardRef(({
  bsPrefix,
  variant,
  animation = "border",
  size,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = "div",
  className,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "spinner");
  const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
  return (0, import_jsx_runtime.jsx)(Component, {
    ref,
    ...props,
    className: (0, import_classnames.default)(className, bsSpinnerPrefix, size && `${bsSpinnerPrefix}-${size}`, variant && `text-${variant}`)
  });
});
Spinner.displayName = "Spinner";
var Spinner_default = Spinner;

export {
  Spinner_default
};
//# sourceMappingURL=chunk-2XLOJCAW.js.map
