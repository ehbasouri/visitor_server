const {Joi} = require("express-validation");

const getAnalyticsSchema = {
    query: Joi.object({
        page : Joi.string(),
        limit: Joi.string(),
        fromDate: Joi.date(),
        toDate: Joi.date()
    })
}

module.exports = {
    getAnalyticsSchema
}