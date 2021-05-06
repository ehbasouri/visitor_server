const authorization = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    next();
}

module.exports = authorization;