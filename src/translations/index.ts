
import { navigationTranslations } from './navigation';
import { authTranslations } from './auth';
import { actionsTranslations } from './actions';
import { statusTranslations } from './status';
import { rolesTranslations } from './roles';
import { featuresTranslations } from './features';
import { contractsTranslations } from './contracts';
import { filtersTranslations } from './filters';
import { messagesTranslations } from './messages';
import { formTranslations } from './forms';
import { proposalTranslations } from './proposals';
import { arbitrationTranslations } from './arbitration';
import { expensesTranslations } from './expenses';

// Combine all translation dictionaries
const translations = {
  ...navigationTranslations,
  ...authTranslations,
  ...actionsTranslations,
  ...statusTranslations,
  ...rolesTranslations,
  ...featuresTranslations,
  ...contractsTranslations,
  ...filtersTranslations,
  ...messagesTranslations,
  ...formTranslations,
  ...proposalTranslations,
  ...arbitrationTranslations,
  ...expensesTranslations,
};

export type TranslationKey = keyof typeof translations;

export { translations };
