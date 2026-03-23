import type { default as Messages } from "../src/i18n/messages/en.json";

declare global {
  interface IntlMessages extends Messages {}
}
