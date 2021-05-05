function createTag({ cat1, cat2, cat3, cat4 }) {
    var tags = "#" + cat1.name
    if (cat2.name) {
        tags = tags + '#' + cat2.name
    } else {
        return tags
    }
    if (cat3.name) {
        tags = tags + '#' + cat3.name
    } else {
        return tags
    }
    if (cat4.name) {
        tags = tags + '#' + cat4.name
    }
    return tags;
}

module.exports = { 
    createTag
};
