import Realm from 'realm';

class Persons extends Realm.Object {}
Persons.schema = {
    name: 'Persons',
    primaryKey: 'personId',
    properties: {
      personId: {type: 'int', default: 0},
      personName: 'string',
      personSurname: 'string',
      personPhoneNumber: 'string',
      personGroup: 'string'
    }
}

class Groups extends Realm.Object {}
Groups.schema = {
    name: 'Groups',
    primaryKey: 'groupId',
    properties: {
        groupId: {type: 'int', default: 0},
        groupName: 'string'
    }
}

export default new Realm({schema: [Persons, Groups]});