const repository = require('../data/repository');

exports.getAll = (req, res) => {
    repository.users.getAll((err, data) => {
        if (err) {
            console.log(`An error happened while reading file: ${err}`);
            return res.status(500).json({ message: err.message });
        }
        const users = JSON.parse(data);
        return res.status(200).json(users);

    })
}

exports.get = ({ params }, res) => {
    repository.users.get((err, data) => {
        if (err) {
            console.log(`An error happened while reading file: ${err}`);
            return res.status(500).json({ message: err.message });
        }
        const users = JSON.parse(data);
        const foundUser = users.find(user => {
            return user.id === params.userId;
        });
        return res.status(200).json(foundUser);

    })
};