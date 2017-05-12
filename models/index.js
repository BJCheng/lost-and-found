const foundRoutes = require("./found");
const lostRoutes = require("./lost");

let constructorMethod = (app) => {
    app.use("/found", foundRoutes);
    app.use("/lost", lostRoutes);
};

module.exports = {
    found: require("./found"),
    lost: require("./lost")
};