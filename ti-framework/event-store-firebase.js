const firebase = require('firebase');

const {
readEventsStartingAt
} = require('./event-store');


const firebaseConfig = {
    apiKey: "AIzaSyAqJTUsLz1ZDLEWEcnBSv0ou7-NGZ4-7JA",
    authDomain: "car2go-1b097.firebaseapp.com",
    databaseURL: "https://car2go-1b097.firebaseio.com",
    projectId: "car2go-1b097",
    storageBucket: "car2go-1b097.appspot.com",
    messagingSenderId: "1008856716"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const eventStorePath = 'transmute/events/';
const readModelStorePath = 'transmute/models/';

// // TODO: Add Encryption here
// // to hide contract data from firebase...
// // store encryption key in a contract with owner
// // https://github.com/cisco/node-jose
// // https://github.com/OR13/JOE

const getItem = async (storePath, key) => {
    return db.ref(storePath + key)
        .once('value')
        .then((snapshot) => {
            let obj = snapshot.val();
            return obj;
        });
};

const setItem = async (storePath, key, value) => {
    return db.ref(storePath + key)
        .set(value);
};

const receiveEvents = async (events) => {
    return await Promise.all(events.map((event) => {
        return setItem(eventStorePath, event.Id, event);
    }));
};

const rebuildReadModelWithGenerator = async (readModel, generator, events) => {
    let model = generator(readModel, events);
    return setItem(readModelStorePath, model.Id, model)
        .then(() => {
            return readModel;
        });
};


const maybeSyncReadModel = async (storePath, key, generator, esInstance) => {
    let eventCount = (await esInstance.eventCount()).toNumber();
    return getItem(storePath, key)
        .then(async (readModel) => {
            if (readModel.EventCount === eventCount) {
                // console.log('No New Events To Apply');
                return false;
            } else {
                let events = await readEventsStartingAt(esInstance, readModel.EventCount);
                // console.log('Apply Events: ', events);
                return rebuildReadModelWithGenerator(readModel, generator, events);
            }
        });
};

module.exports = {
    eventStorePath,
    readModelStorePath,
    receiveEvents,
    rebuildReadModelWithGenerator,
    maybeSyncReadModel
};
