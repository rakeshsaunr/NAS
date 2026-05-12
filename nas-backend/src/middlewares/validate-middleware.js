
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });

        if (error) {
            console.error("Error Occurred:", error);
            const messages = error.details.map(d => d.message);
            return res.status(400).json({ errors: messages });
        }
        next();
    };
};

module.exports = validate;
