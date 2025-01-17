const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.errors })
    }
};

module.exports = validate;