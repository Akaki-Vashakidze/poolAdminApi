const Package = require('../model/package');
const responseHelper = require('../extra/responseHelper');
const ObjectId = require('mongodb').ObjectID;

async function add(req, res) {
    let package = req.body.data;
    if (!package || !package.name || !package.visitAmount || !package.duration || !package.price) {
        return { error: "Fill All Required Fields" };
    }
    return await new Package(package).save();
}

async function findAll(req, res) {
    let package = req.body.data;
    return await Package.find({ recordState: 1 });
}

async function find(req, res) {
    let data = req.body.data,
        paging = req.body.paging,
        searchQuery = {};
    Object.keys(data).forEach(key => {
        if (data[key]) {
            searchQuery[key] = data[key];
        }
    });
    var [packages, count] =   await Promise.all([
        Package.find(searchQuery)
            .skip((paging.limit * paging.page) - paging.limit)
            .limit(paging.limit)
            .exec(),
        Package.countDocuments(searchQuery).exec()
    ]);
    
    return {
        items: packages,
        totalItems: count
    }

}

async function edit(req, res) {
    let package = req.body.data;
    const packageToEdit = await Package.findOne({ _id: ObjectId(package._id) }).exec();
    if (!packageToEdit) return { error: 'Package Not Found!' }
    const updateQuery = {};

    if (package.name) {
        updateQuery.name = package.name;
    }
    if (package.recordState || package.recordState === 0) {
        updateQuery.recordState = package.recordState;
    }
    if (package.visitAmount || package.visitAmount === 0) {
        updateQuery.visitAmount = package.visitAmount;
    }
    if (package.duration) {
        updateQuery.duration = package.duration;
    }
    if (package.price) {
        updateQuery.price = package.price;
    }

    if (Object.keys(updateQuery).length !== 0) {
        return await Package.updateOne({ _id: packageToEdit._id }, updateQuery, { new: true });
    }
    return { result: 'Nothing Changed' }
}

module.exports = {
    add,
    findAll,
    find,
    edit
}
