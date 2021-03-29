const repository = require('../data/repository');

exports.getAll = (req, res) => {
    repository.transfers.getAll((err, data) => {
        if (err) {
            console.log(`An error happened while reading file: ${err}`);
            return res.status(500).json({ message: err.message });
        }
        const transfers = JSON.parse(data);
        return res.status(200).json(transfers);

    })
}