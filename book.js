
const queries = {
    Model: "test",
    insertQuery : (data) => {
        console.log("this.Model", this.Model)
        const newCategory = new this.Model(data);
        return newCategory.save()
    },
    getQuery : (data) => {
        return this.Model.find(data)
    },
    deleteQuery : (data) => {
        return this.Model.findOneAndDelete(data)
    },
    putQuery : (_id, data) => {
        return this.Model.findOneAndUpdate({_id}, data)
    }
}

const catQuery = Object.create(queries);

console.log("catQuery", catQuery.Model, queries);
