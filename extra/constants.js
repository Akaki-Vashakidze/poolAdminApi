var schema = require('mongoose').Schema;

module.exports = {
    RECORD_STATE: {
        ACTIVE: 1,
        DELETED: 0,
        INACTIVE: 2
    },
    USER_GROUPS: {
        ADMIN: 1000,
        USER: 1,
        COACH: 10
    },
    HISTORY: {
        DATA_TYPE: {
            USER: 1,
            COACH: 10,
        },
        CHANGE_TYPE: {
            NEW_PACKAGE: 1,
            BUG_FIX: 2,
            USER_INFO: 3,
            OTHER: 4,
            VISIT: 5
        }
    },
    user: {
        Pool: new schema({
            group: {
                type: schema.Types.ObjectId,
                default: null,
                ref: 'groups'
            },
            package: {
                type: schema.Types.ObjectId,
                default: null,
                ref: 'packages'
            },
            coach: {
                type: schema.Types.ObjectId,
                default: null,
                ref: 'coaches'
            },
            startDate: {
                type: String,
                default: null,
            },
            endDate: {
                type: String,
                default: new Date(32503665600000),
            },
            active: {
                type: Boolean,
                default: false
            },
            visited: {
                type: Number,
                default: function () {
                    return Number(0);
                }
            }
        }, { _id: false }),
        Contact: new schema({
            address: {
                type: String,
                default: null
            },
            phone: {
                type: String,
                default: null
            },
            mobile: {
                type: String,
                default: null
            },
            responsibleName: {
                type: String,
                default: null
            },
            responsiblePhone: {
                type: String,
                default: null
            }
        }, { _id: false }),
        Profile: new schema({
            firstName: {
                type: String,
                default: null
            },
            lastName: {
                type: String,
                default: null
            },
            birthDate: {
                type: Date,
                default: null
            },
            pid: {
                type: String,
                default: null
            },
            avatarName: {
                type: String,
                default: null,
            },
            coverName: {
                type: String,
                default: null,
            },
            avatarId: {
                type: String,
                default: null,
            },
            coverId: {
                type: String,
                default: null,
            }
        }, { _id: false }),
        Card: new schema({
            code: {
                type: String,
                default: null
            },
            timestamp: {
                type: Date,
                default: new Date()
            }
        }, { _id: false })
    },
    coach: {
        Pool: new schema({
            groups: [{ type: schema.Types.ObjectId, ref: 'groups', default: [] }]
        }, { _id: false }),
        Contact: new schema({
            address: {
                type: String
            },
            phone: {
                type: String
            },
            mobile: {
                type: String
            }
        }, { _id: false }),
        Profile: new schema({
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            birthDate: {
                type: Date,
                default: null
            },
            pid: {
                type: String
            },
            description: {
                type: String
            },
            avatarName: {
                type: String,
                default: null,
            },
            coverName: {
                type: String,
                default: null,
            },
            avatarId: {
                type: String,
                default: null,
            },
            coverId: {
                type: String,
                default: null,
            }
        }, { _id: false })
    },
    ADMIN: {
        "pool": {},
        "isVerified": true,
        "userName": "swim",
        "profile": {
            "firstName": "admin",
            "lastName": "admin",
            "pid": "admin",
        },
        "contact": {},
        "userGroupId": 1000,
        "recordState": 1,
    }
};
