const foundRoutes = require("./found");

let constructorMethod = (app) => {
    app.use("/found", foundRoutes);
};

module.exports = {
    found: require("./found")
};