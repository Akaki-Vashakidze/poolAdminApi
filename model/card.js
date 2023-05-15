var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
    code: {
        type: String,
        default: null
    },
    user: { type: String, ref: 'users' },
    fromDate: { type: Date, default: () => { return new Date(); } },
    toDate: { type: Date, default: () => { return new Date(32503665600000); } },
});


cardSchema.pre('find', async function (next) {
    const now = new Date();
    const where = { fromDate: { '$lt': now }, toDate: { '$gt': now } };
    this.where(where);
    next();
});

cardSchema.pre('findOneAndUpdate', async function (next) {
    const now = new Date();
    const where = { fromDate: { '$lt': now }, toDate: { '$gt': now } };
    this.where(where);
    next();
});

cardSchema.pre('findOne', async function (next) {
    const now = new Date();
    const where = { fromDate: { '$lt': now }, toDate: { '$gt': now } };
    this.where(where);
    next();
});

cardSchema.statics.createNewCard = async function (user, code) {
    await this.findOneAndUpdate({ 'user': user }, { toDate: new Date() });
    const newCard = new this({ user, code });
    return await newCard.save();
};


module.exports = mongoose.model('cards', cardSchema);
