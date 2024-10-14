const mongoose = require("mongoose");

const mongoDB = async () => {
    await mongoose.connect("mongodb+srv://mbhiman70:hyvsITdwLwXjNFKf@bondhub-cluster0.u5lza.mongodb.net/NamasteNode");
}

module.exports = mongoDB;