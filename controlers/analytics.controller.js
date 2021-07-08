const queries = require("../queries/query");
const Analytics = require("../models/Analytics");

const analyticsQuery = Object.create(queries);
analyticsQuery.Model = Analytics;

async function registerAndUpdateAnalytics(req, res, next) { 
    
    try {
        var fromDate = new Date();
        fromDate.setHours(0,0,0,0);
        var toDate = new Date();
        toDate.setHours(24,0,0,0);
        if(req.body.status !== "archive"){
            next()
            return;
        }
        const { _id } = req.user;

        const existAnalytics = await analyticsQuery.getQuery({business_id : _id}, null, null, null, fromDate, toDate)
        if(existAnalytics.length > 0){
            const rawData = {
                name: fromDate.toLocaleDateString(),
                buy_price : existAnalytics[0].buy_price + req.body.buy_price,
                price : existAnalytics[0].price + req.body.price 
            }
            rawData.earn = rawData.price - rawData.buy_price

            const result = await analyticsQuery.putQuery(existAnalytics[0]._id, rawData)
            next();
            return;
        }

        const rawNewData = {
            name: fromDate.toLocaleDateString(),
            buy_price : req.body.buy_price,
            price : req.body.price ,
            earn : req.body.price - req.body.buy_price ,
            business_id : _id
        }

        console.log("rawNewData : ", rawNewData);

        const result = await analyticsQuery.insertQuery(rawNewData)

        next();

    } catch (error) {
        next(error)        
    }
}

async function getAnalyticsController(req, res, next) {
    const { _id } = req.user;
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    delete req.query.fromDate
    delete req.query.toDate
    try {
        const analytics = await analyticsQuery.getQuery({business_id: _id, ...req.query}, req.query.page, req.query.limit, null, fromDate, toDate);
        return res.status(200).json(analytics)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerAndUpdateAnalytics,
    getAnalyticsController
};