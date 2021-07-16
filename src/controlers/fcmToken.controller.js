const queries = require("../queries/query")
const FcmToken = require("../models/fcmToken");

const fcmTokenQuery = Object.create(queries);
fcmTokenQuery.Model = FcmToken;

async function inserFcmTokenController(req, res, next) {
    console.log("req : ", req.user);
    try {
        const fcmToken = await fcmTokenQuery.getQuery({user_id: req.user._id});
        let updatedFcmList = []
        let result = null
        if(fcmToken && fcmToken[0] && fcmToken[0].fcm_token){
            updatedFcmList = fcmToken[0].fcm_token.filter(item=>item != req.body.fcm_token)
            console.log("updatedFcmList : ", updatedFcmList);
            updatedFcmList.push(req.body.fcm_token);
            result = await fcmTokenQuery.putQuery(fcmToken[0]._id, {fcm_token : updatedFcmList});
        }else {
            result = await fcmTokenQuery.insertQuery({ ...req.body, user_id : req.user._id})
        }
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }    
}

async function getFcmTokenController(req, res, next) {
    try {
        const fcmToken = await fcmTokenQuery.getQuery({user_id : req.user._id});
        return res.status(200).json(fcmToken)
    } catch (error) {
        next(error);
    }
}

async function deleteFcmTokenController(req, res, next) {
    try {
        const fcmToken = await fcmTokenQuery.getQuery({user_id: req.user._id});
        let updatedFcmList = []
        if(fcmToken && fcmToken[0] && fcmToken[0].fcm_token ){
            updatedFcmList = fcmToken[0].fcm_token.filter(item=>item!=req.query.fcm_token)
        }
        const result = await fcmTokenQuery.putQuery(fcmToken[0]._id, {fcm_token: updatedFcmList});
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}


module.exports = {
    inserFcmTokenController,
    getFcmTokenController,
    deleteFcmTokenController
}

