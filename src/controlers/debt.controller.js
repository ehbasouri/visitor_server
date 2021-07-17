const queries = require("../queries/query")
const Order = require("../models/order");
const Debt = require("../models/Debt");
const Paied = require("../models/paied");

const debtQueries = Object.create(queries);
debtQueries.Model = Debt;

async function inserDebtController(req, res, next) {
    try {
        const debt = await debtQueries.insertQuery({...req.body});
        return res.status(200).json(debt)
    } catch (error) {
        next(error)
    }    
}

async function getDebtController(req, res, next) {
    try {
        const debt = await debtQueries.getQuery(req.query);
        return res.status(200).json(debt)
    } catch (error) {
        next(error);
    }
}

async function deleteDebtController(req, res, next) {
    try {
        const result = await debtQueries.deleteQuery({_id: req.query.id});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

async function putDebtController(req, res, next) {
    try {
        const result = await debtQueries.putQuery(req.query.id, { ...req.body});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}


async function autoUpdateDebtController(req, res, next) {
    if(req.body.status !== "archive" ){
        next()
    }  else {
        if(req.body.price === req.body.paied_amount){
            next()
        } else {
            try {
                const data = {}
                const orderResult = await Order.findById(req.query.id); 
                const debt = await debtQueries.getQuery({ client_id: orderResult.client_id , business_id: orderResult.business_id });
                if(debt && debt.length > 0 ){
                    data.amount = debt[0].amount + req.body.price - req.body.paied_amount
                    const result = await debtQueries.putQuery(debt[0]._id, {...data});
                }else {
                data.amount = req.body.price - req.body.paied_amount;
                    data.paied_amount = 0;
                    data.business = orderResult.business
                    data.business_id = orderResult.business_id
                    data.client = orderResult.client
                    data.client_id = orderResult.client_id
                    const debtInserResult = await debtQueries.insertQuery(data);
                }
                const newPaied = new Paied({
                    amount : req.body.price - req.body.paied_amount ,
                    business_id:orderResult.business_id,
                    client_id: orderResult.client_id,
                    order_id: orderResult._id,
                    is_debt: true
                })
                const paiedResult = await newPaied.save();
                next() 
            } catch (error) {
                next(error);
            }
        }
    }
}

async function backToStoreDebtController(req, res, next) {
    if(req.body.status !== "active" ){
        next()
    }  else {
        if(req.body.price === req.body.paied_amount){
            next()
        } else {
            try {
                const orderResult = await Order.findById(req.query.id); 
                const deletePaied = await Paied.findOneAndRemove({order_id: req.query.id});
                const current_debt = await Debt.findOne({client_id: orderResult.client_id, business_id: orderResult.business_id})
                const query_data = {amount: current_debt.amount - (orderResult.price - orderResult.paied_amount) }
                const resultDebt = await debtQueries.putQuery(current_debt._id, query_data )
                next() 
            } catch (error) {
                next(error);
            }
        }
    }
}



module.exports = {
    inserDebtController,
    getDebtController,
    deleteDebtController,
    putDebtController,
    autoUpdateDebtController,
    backToStoreDebtController
}

