var mongoose = require('mongoose');

var visitSchema = new mongoose.Schema({
    card: {
        type: String,
        ref: 'cards'
    },
    user: { type: String, ref: 'users' },
    paymentKey: { type: String },
    pool: { type: String, ref: 'pool' },
    visitDate: { type: Date, default: () => { return new Date(); } }
});


visitSchema.statics.addVisit = async function (user, card, pool, paymentKey) {
    const newCard = new this({ user, card, pool, paymentKey });
    return await newCard.save();
};


module.exports = mongoose.model('visits', visitSchema);
