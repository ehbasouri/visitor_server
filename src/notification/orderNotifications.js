const { sentFcmNotification } = require("./sendNotification");
const FcmToken = require("../models/fcmToken");
const queries = require("../queries/query")

const fcmTokenQueries = Object.create(queries);
fcmTokenQueries.Model = FcmToken;


async function insertOrderNotification(req, res, next) {
    try {
        next()
        const fcmTokens = await FcmToken.findOne({user_id: req.body.business_id});
        if(fcmTokens && fcmTokens.fcm_token && fcmTokens.fcm_token.length > 0 ){
            sentFcmNotification({
                registration_ids: fcmTokens.fcm_token,
                title: "سفارش جدید ",
                body: `سفارش جدید از طرف ${req.body.client.name} ثبت گردید`
            }).then(()=>{
                console.log("sent...")
            }).catch(err=>{
            })
        }
    } catch (error) {
        next(error)
    }    
}

module.exports = {
    insertOrderNotification
}