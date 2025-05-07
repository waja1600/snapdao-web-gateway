
import { navigationTranslations } from './navigation';
import { commonTranslations } from './common';
import { formTranslations } from './forms';
import { proposalTranslations } from './proposals';
import { arbitrationTranslations } from './arbitration';

// Combine all translation dictionaries
const translations = {
  ...navigationTranslations,
  ...commonTranslations,
  ...formTranslations,
  ...proposalTranslations,
  ...arbitrationTranslations,
};

export type TranslationKey = keyof typeof translations;

export { translations };
