const repository = require('../data/repository');

exports.getAll = (req, res) => {
    repository.wallets.getAll((err, data) => {
        if (err) {
            console.log(`An error happened while reading file: ${err}`);
            return res.status(500).json({ message: err.message });
        }
        const wallets = JSON.parse(data);
        return res.status(200).json(wallets);

    })
}

exports.get = ({ params }, res) => {
    repository.wallets.get((err, data) => {
        if (err) {
            console.log(`An error happened while reading file: ${err}`);
            return res.status(500).json({ message: err.message });
        }
        const wallets = JSON.parse(data);
        const foundWallets = wallets.find(wallet => {
            return wallet.userId === params.userId;
        });
        return res.status(200).json(foundWallets || { wallets: [] });

    })
};

exports.transfer = (req, res) => {
    repository.wallets.get((err, data) => {
        console.log('====== TRASNFER ONGOING =====');
        if (err) {
            console.log(`An error happened while reading file: ${err}`);
            return res.status(500).json({ message: err.message });
        }
        let { senderName, receiverName, senderId, senderWalletHash, receiverId, receiverWalletHash, amount } = req.body;
        amount = +amount;
        const usersWallets = JSON.parse(data);
        const foundWalletSender = usersWallets.find(wallet => {
            return wallet.userId === senderId;
        });
        const foundWalletReceiver = usersWallets.find(wallet => {
            return wallet.userId === receiverId;
        });
        if (!foundWalletSender || !foundWalletReceiver) { return res.status(200).json({ valid: false, message: 'Transaction denied - incorrect input' }); }

        const senderWallet = foundWalletSender.wallets[senderWalletHash];
        const receiverWallet = foundWalletReceiver.wallets[receiverWalletHash];

        if (!senderWallet || !receiverWallet) { return res.status(200).json({ valid: false, message: 'Transaction denied - incorrect input' }); }
        if (senderWallet.balance < amount) {
            console.log(`Transaction denied - insufficient funds`);
            return res.status(200).json({ valid: false, message: 'Transaction denied - insufficient funds' });
        }
        senderWallet.balance -= amount;
        receiverWallet.balance += amount;
        repository.wallets.update(JSON.stringify(usersWallets), (err) => {
            if (err) return console.log(err);
            updateTransfer(res, { senderName, receiverName, senderId, senderWalletHash, receiverId, receiverWalletHash, amount });
        })
    })
};

function updateTransfer(res, transactionData) {
    repository.transfers.getAll((err, data) => {
        if (err) {
            console.log(`An error happened while reading file: ${err}`);
            return res.status(500).json({ message: err.message });
        }
        const transfers = JSON.parse(data);
        transfers.push(transactionData);
        repository.transfers.update(JSON.stringify(transfers), (err) => {
            if (err) return console.log(err);
            return res.status(200).json({ valid: true, message: 'Successful transaction' });
        })

    })
}