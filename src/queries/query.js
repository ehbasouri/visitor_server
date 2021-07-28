const queries = {
    Model: null,
    insertQuery (data) {
        const newCategory = new this.Model(data);
        return newCategory.save()
    },
    getQuery (data, page, limit, text, fromDate, toDate, sort = {created_at: -1}, date_query = "updated_at" ) {
        var query = JSON.parse(JSON.stringify(data));
        delete query.page;
        delete query.limit;
        if(text){
            query = {...query, $text: {$search: text}}
        }
        if(fromDate){
            query = {...query, [date_query]: { $gte: fromDate, $lte: toDate } }
        }
        return this.Model.find(query, null , { skip: Number(page), limit: Number(limit) }).sort(sort)
    },
    getOneQuery (data) {
        return this.Model.findOne(data)
    },
    deleteQuery (data) {
        return this.Model.findOneAndDelete(data)
    },
    putQuery (_id, data) {
        return this.Model.findOneAndUpdate({_id},data)
    }
  };

module.exports = queries