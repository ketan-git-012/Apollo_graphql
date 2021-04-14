const { DataStore } = require('notarealdb');
const store = new DataStore('./data');
// const trainee = require('./../../data')

console.log("trainee:", store.collection('trainee').list());

module.exports = {
    trainee : store.collection('trainee')
}