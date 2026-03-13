/**
 * @ksefuj/validator - KSeF FA(3) XML validation library
 *
 * Main exports for the validator package.
 */

// Core validation functions and types
export {
  validate,
  type ValidationResult,
  type ValidationError,
  type ValidateOptions,
} from "./validate.js";

// Semantic validation exports
export { checkSemantics, type SemanticRule } from "./semantic.js";

// XSD validation exports
export { validateXsd, disposeValidator, isValidatorDisposed } from "./xsd.js";

// Localization exports
export { type Locale } from "./messages.js";
