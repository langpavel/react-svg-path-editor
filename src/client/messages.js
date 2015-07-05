export default {
  en: {
    auth: {
      form: {
        button: {
          login: 'Login',
          signup: 'Sign up'
        },
        hint: 'Hint: pass1',
        legend: 'Login / Sign Up',
        placeholder: {
          email: 'your@email.com',
          password: 'password'
        },
        wrongPassword: 'Wrong password'
      },
      logout: {
        button: 'Logout'
      },
      title: 'Login'
    },
    buttons: {
      cancel: 'Cancel',
      edit: 'Edit',
      save: 'Save'
    },
    confirmations: {
      cancelEdit: `You have unsaved changes. Are you sure you want to cancel them?`
    },
    home: {
      title: 'Este.js Bare App'
    },
    me: {
      title: 'Me',
      welcome: `Hi {email}. This is your secret page.`
    },
    notFound: {
      continueMessage: 'Continue here please.',
      header: 'This page isn\'t available',
      message: 'The link may be broken, or the page may have been removed.',
      title: 'Page Not Found'
    },
    validation: {
      email: `Email address is not valid.`,
      password: `Password must contain at least {minLength} characters.`,
      required: `Please fill out {prop, select,
        email {email}
        password {password}
        other {'{prop}'}
      }.`
    }
  }
};
