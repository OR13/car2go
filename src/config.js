// EXAMPLE ONLY! THIS FILE IS USUALLY NOT PART OF GIT TRACKING
// .gitignore skips this at the project level, but it is added for example here

export const firebase = {
  apiKey: "AIzaSyDIXrTv0TD9zdaCy5n_QXm6_VMaS-1B3sQ",
  authDomain: "transmute-industries.firebaseapp.com",
  databaseURL: "https://transmute-industries.firebaseio.com",
  projectId: "transmute-industries",
  storageBucket: "transmute-industries.appspot.com",
  messagingSenderId: "1068223304219"
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
