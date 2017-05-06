// EXAMPLE ONLY! THIS FILE IS USUALLY NOT PART OF GIT TRACKING
// .gitignore skips this at the project level, but it is added for example here

export const firebase = {
  apiKey: "AIzaSyAqJTUsLz1ZDLEWEcnBSv0ou7-NGZ4-7JA",
  authDomain: "car2go-1b097.firebaseapp.com",
  databaseURL: "https://car2go-1b097.firebaseio.com",
  projectId: "car2go-1b097",
  storageBucket: "car2go-1b097.appspot.com",
  messagingSenderId: "1008856716"
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
