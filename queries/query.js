
const queries = {
    Model: null,
    insertQuery (data) {
        const newCategory = new this.Model(data);
        return newCategory.save()
    },
    getQuery (data, page, limit) {
        return this.Model.find(data, null , { skip: Number(page), limit: Number(limit) })
    },
    getOneQuery (data) {
        return this.Model.findOne(data)
    },
    deleteQuery (data) {
        return this.Model.findOneAndDelete(data)
    },
    putQuery (_id, data) {
        return this.Model.findOneAndUpdate({_id}, data)
    }
  };

module.exports = queries