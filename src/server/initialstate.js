import messages from '../client/messages';

const initialLocale = 'en';

export default {
  auth: {
    data: null,
    form: null
  },
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  },
  pendingActions: {},
  users: {
    viewer: null
  }
};
