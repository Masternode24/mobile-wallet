import Spinner from "../utils/spinner";
const api = require('../../api.js');

export class WalletController extends  WalletInterface {

	wallet = null;

	/** Object, contains info about transaction */
	config = {}

	constructor(wallet, config) {
		super();
		this.wallet = wallet;
		this.config = config;
	}

	/**
	 * Create transaction object and send it via token provider.
	 * @param  {String} recipient The recipient in hex
	 * @param  {Object} wallet The sender wallet
	 * */
	sendTx = function(tx, cb){
		var recipient, wallet, network, amount, amountFee, data, coin, feeType, txType, token, tx, cb;

		network   = tx.get('network');
		wallet    = tx.get('wallet');
		recipient = tx.get('recipient');
		amount    = tx.get('amount');
		coin      = tx.get('coin');
		amountFee = tx.get('amountFee');
		feeType   = tx.get('feeType')
		txType    = tx.get('txType')
		data      = tx.get('data')
		cb        = tx.get('cb')

		token = coin.token;
		if(+amountFee === 0){
			return cb("Fee must be more then 0");
		}
		tx = {
			account: {
				address: wallet.address,
				privateKey: wallet.privateKey
			},
			recipient: recipient,
			network: network,
			token: token,
			coin: coin,
			amount: amount,
			amountFee: amountFee,
			data: data
		};
		//store.current.creatingTransaction = true;
		return api.createTransaction(tx, function(err, data){
			if (err != null) {
				store.current.creatingTransaction = false;
				if (err.toString().indexOf("has no matching Script") !== -1){
					err = "Address is not valid";
				}
				return cb(err);
			}
			var currency = (send.coin.nickname || send.coin.token).toUpperCase();
			return confirm(store, "Are you sure to send " + tx.amount + " " + currency + " to " + send.to/*, "Yes, Send!"*/, function(agree){
				if (!agree) {
					store.current.creatingTransaction = false;
					return cb("You are not agree");
				}
				var txSpinner = new Spinner(store, "Sending funds", {
					displayDescription: true,
				});
				return pushTx((import$({
					token: token,
					txType: txType,
					network: network
				}, data)), function(err, tx){
					store.current.creatingTransaction = false;
					txSpinner.finish();
					if (err != null) {
						return cb(err);
					}
					return createPendingTx({
						store: store,
						token: token,
						network: network,
						tx: tx,
						amountSend: amountSend,
						amountSendFee: amountSendFee
					}, function(err){
						return cb(err, tx);
					});
				});
			});
		});
	};

}