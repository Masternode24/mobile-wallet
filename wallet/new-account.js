// Generated by LiveScript 1.5.0
(function(){
  var ref$, objToPairs, pairsToObj, map, toJS, getKeys, web3, slice$ = [].slice;
  ref$ = require('prelude-ls'), objToPairs = ref$.objToPairs, pairsToObj = ref$.pairsToObj, map = ref$.map;
  toJS = require('mobx').toJS;
  getKeys = require('./api.js').getKeys;
  // web3 = require('./web3.js');
  module.exports = function(store, mnemonic, cb){
    var generateCoinWallet, generateCoinWallets;
    mnemonic == null && (mnemonic = "");
    generateCoinWallet = function(coin, cb){
      var network, index;
      network = coin[store.current.network];
      if (network.disabled === true) {
        return cb(null);
      }
      index = store.current.accountIndex;
      return getKeys({
        index: index,
        network: network,
        mnemonic: mnemonic,
        token: coin.token
      }, function(err, wallet){
        var balance, balanceUsd, usdRate;
        if (err != null) {
          return cb(err);
        }
        balance = '...';
        balanceUsd = '...';
        usdRate = '...';
        wallet.coin = coin;
        wallet.network = network;
        wallet.balance = balance;
        wallet.balanceUsd = balanceUsd;
        wallet.usdRate = usdRate;
        wallet.mnemonic = mnemonic;
        return cb(null, JSON.parse(JSON.stringify(wallet)));
      });
    };
    generateCoinWallets = function(arg$, cb){
      var coin, rest;
      coin = arg$[0], rest = slice$.call(arg$, 1);
      if (coin == null) {
        return cb(null, []);
      }
      return generateCoinWallet(coin, function(err, walletOrNull){
        if (err != null) {
          return cb(err);
        }
        if (walletOrNull != null) {
          coin.wallet = walletOrNull;
          walletOrNull.usdRate = '..';
          walletOrNull.eurRate = '..';
          walletOrNull.balanceUsd = '..';
          walletOrNull.pendingSent = '..';
          walletOrNull.balance = '..';
        }
        return generateCoinWallets(rest, function(err, wallets){
          var currentWallets, all;
          if (err != null) {
            return cb(err);
          }
          currentWallets = (function(){
            switch (false) {
            case walletOrNull == null:
              return [walletOrNull];
            default:
              return [];
            }
          }());
          all = currentWallets.concat(wallets);
          return cb(null, all);
        });
      });
    };
    return generateCoinWallets(store.coins, function(err, wallets){
      if (err != null) {
        return cb(err);
      }
      return cb(null, {
        mnemonic: mnemonic,
        wallets: wallets
      });
    });
  };
}).call(this);
