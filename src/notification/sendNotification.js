const { default: axios } = require("axios");
// const Axios = require("axios")

const url = "https://fcm.googleapis.com/fcm/send"

const notificationData = {
    "registration_ids" : [],
    "collapse_key" : "type_a",
    "notification" : {
        "body" : "از طرف ",
        "title": "سفارش جدید "
    },
    "data" : {
        "body" : "از طرف Ehsan",
        "title": "سفارش جدید ",
        "key_1" : "Value for key_1",
        "key_2" : "Value for key_2"
    }
   }

function sentFcmNotification( data = {
    registration_ids: "",
    title: "",
    body: ""
}) {
    notificationData.registration_ids = data.registration_ids;
    notificationData.notification.title = data.title;
    notificationData.data.title = data.title;
    notificationData.notification.body = data.body;
    notificationData.data.body = data.body;

    // Default options are marked with *
    return axios(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAvnRhNNw:APA91bG_rC9x-9vjXID9pqRkBgA-2QaNfSU-7eLGwpEcrkqHglbM_eyeu38Ow1k4nGSe17EWHkVI6Nc4ks4XHD6rF7AVMHSHIrtpoALFD9uI3QuHFwdqxcgcb_5_VAUOKxC3Kdn275OQ'
      },
      data: JSON.stringify(notificationData) // body data type must match "Content-Type" header
    });
  }

module.exports = {
    sentFcmNotification
};