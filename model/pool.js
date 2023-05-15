const Visit = require('./visit');
var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
const poolSchema = new schema({
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
    },
    paymentKey: {
        type: String, default: () => { return new Date().getTime(); }
    },
    user: { type: String, ref: 'users' },
    fromDate: { type: Date, default: () => { return new Date(); } },
    toDate: { type: Date, default: () => { return new Date(32503665600000); } },
})

poolSchema.pre('find', async function (next) {
    if (this.options.skipHooks) {
        next();
    } else {
        const now = new Date();
        const where = { fromDate: { '$lt': now }, toDate: { '$gt': now } };
        this.where(where);
        next();
    }
});

poolSchema.pre('findOneAndUpdate', async function (next) {
    if (this.options.skipHooks) {
        next();
    } else {
        const now = new Date();
        const where = { fromDate: { '$lt': now }, toDate: { '$gt': now } };
        this.where(where);
        next();
    }
});

poolSchema.pre('findOne', async function (next) {
    if (this.options.skipHooks) {
        next();
    } else {
        const now = new Date();
        const where = { fromDate: { '$lt': now }, toDate: { '$gt': now } };
        this.where(where);
        next();
    }
});

poolSchema.statics.createNewPool = async function (user, data, changeType) { //1 axali gadaxda, 2 cvlileba
    let paymentKey;
    const found = await this.findOneAndUpdate({ 'user': user }, { toDate: new Date() });
    if (changeType != 1 && found) paymentKey = found.paymentKey
    const newPool = new this({ ...data, user, paymentKey });
    return await newPool.save();
};

poolSchema.statics.findHistory = async function (user) {
    let history = await this.find({ user: user }, {}, { skipHooks: true, isHistory: true }).populate(['coach', 'package', 'group']);

    return history.sort((a, b) => a.fromDate - b.fromDate);
};


poolSchema.post('find', async function (docs) {
    for (let doc of docs) {
        doc.visited = await Visit.countDocuments({ user: doc.user, paymentKey: doc.paymentKey });
    }
});

module.exports = mongoose.model('pool', poolSchema);
