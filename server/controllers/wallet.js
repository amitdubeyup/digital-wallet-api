const WalletModal = require('../modals/wallet');
const ObjectId = require('mongoose').Types.ObjectId;

const fetchWallet = async (body) => {
    try {
        if (!body?.user_id) throw new Error('User id is required.');
        const result = await WalletModal.findOne({ user_id: new ObjectId(body?.user_id) }).sort({ created_at: -1 });
        if (result) return result;
        throw new Error('Wallet details not found for this user.');
    } catch (error) {
        throw new Error(error?.message ?? 'Unable to fetch wallet balance.');
    }
}

const updateWallet = async (body) => {
    try {
        const result = await new WalletModal(body).save();
        return result;
    } catch (error) {
        throw new Error(error?.message ?? 'Unable to initialize wallet.');
    }
}

const walletBalance = async (req, res) => {
    try {
        const result = await fetchWallet(req.params)
        return res.send({
            success: true,
            message: 'Balance fetched successfully.',
            data: {
                balance: result?.balance
            }
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error?.message ?? 'Unable to fetch balance.'
        });
    }
}

const fetchTransaction = async (req, res) => {
    try {
        if (!req.params?._id) throw new Error('Transaction id is required.');
        const result = await WalletModal.findOne({ _id: new ObjectId(req.params?._id) }).select(['amount', 'type', 'balance', 'description', 'created_at']);
        return res.send({
            success: true,
            message: 'Transaction fetched successfully.',
            data: result
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error?.message ?? 'Unable to fetch wallet.'
        });
    }
}

const fetchTransactions = async (req, res) => {
    try {
        let sort_by = { created_at: -1 };
        if (req.query?.created_at) sort_by = { created_at: parseInt(req.query?.created_at) };
        if (req.query?.amount) sort_by = { amount: parseInt(req.query?.amount) };
        if (req.query?.balance) sort_by = { balance: parseInt(req.query?.balance) };
        const limit = req.query?.limit ? parseInt(req.query?.limit) : 10;
        const skip = req.query?.skip ? parseInt(req.query?.skip) : 0;
        const result = await WalletModal.find({ user_id: new ObjectId(req.params?.user_id) }).select(['amount', 'type', 'balance', 'description', 'created_at']).sort(sort_by).limit(limit + 1).skip(skip * limit);
        const have_prev = skip > 0 ? true : false;
        const have_next = result.length > limit ? true : false;
        if (result.length > limit) result.pop();
        return res.send({
            success: true,
            message: 'Transactions fetched successfully.',
            data: { have_prev, have_next, transactions: result },
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error?.message ?? 'Unable to fetch transactions.'
        });
    }
}

const createTransaction = async (req, res) => {
    try {
        if (!req.params?.user_id) throw new Error('User id is required.');
        if (!req.body?.amount) throw new Error('Amount is required.');
        if (isNaN(req.body?.amount)) throw new Error('Amount must be of number type.');
        if (!req.body?.type) throw new Error('Transaction type is required.');
        if (!['credit', 'debit'].includes(req.body?.type)) throw new Error('Transaction type must be of credit/debit type.');

        const wallet = await fetchWallet(req.params);
        let balance = parseFloat(wallet?.balance);
        if (req.body?.type == 'credit') {
            balance = balance + parseFloat(req.body?.amount);
        }
        if (req.body?.type == 'debit') {
            balance = balance - parseFloat(req.body?.amount);
        }
        const data = {
            user_id: wallet?.user_id,
            amount: parseFloat(req.body?.amount)?.toFixed(4),
            type: req.body?.type,
            balance: balance?.toFixed(4),
            description: req.body?.description ? req.body?.description : req.body?.type == 'credit' ? 'Wallet Credited' : 'Wallet Debited',
        };
        await updateWallet(data);
        return res.send({
            success: true,
            message: `Wallet ${req.body?.type}ed successfully.`
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error?.message ?? `Unable to update wallet.`
        });
    }
}

module.exports = {
    fetchWallet: fetchWallet,
    updateWallet: updateWallet,
    walletBalance: walletBalance,
    fetchTransaction: fetchTransaction,
    fetchTransactions: fetchTransactions,
    createTransaction: createTransaction,
};
