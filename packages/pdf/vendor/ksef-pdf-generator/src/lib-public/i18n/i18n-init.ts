import i18next from 'i18next';
import { pl } from './lang/pl';
// ksefuj patch: only the PL resource is bundled (the upstream EN resource is a placeholder stub
// with 1 of 997 keys translated, and the adapter fixes the language to PL).

export const i18nReady: Promise<void> = i18next
  .init({
    lng: 'pl',
    debug: false,
    showSupportNotice: false,
    resources: {
      pl: { translation: pl },
    },
  })
  .then(() => undefined);
