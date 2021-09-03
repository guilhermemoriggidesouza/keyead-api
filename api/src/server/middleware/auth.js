const jwt = require("jsonwebtoken");
const config = require("../../infra/config")

module.exports = function (req, res, next) {
    const token = req.header("Authenticate");
    if (!token)
        return res.status(401).send({ success: false, errors: ["Acesso negado."] });

    try {
        const decoded = jwt.verify(token, config.jwt.privateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(400).send({ success: false, errors: ["Acesso negado."] });
    }
};
