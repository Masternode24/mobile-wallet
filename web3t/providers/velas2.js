// Generated by LiveScript 1.6.0
(function(){
  var stringify, ref$, filter, map, foldl, each, plus, minus, times, div, fromHex, get, post, Web3, Tx, BN, hdkey, bip39, jsonParse, deadline, decode, encode, Common, vlxToEth, ethToVlx, isChecksumAddress, isAddress, toVelasAddress, toEthAddress, getEthereumFullpairByIndex, tryParse, makeQuery, getTransactionInfo, getGasEstimate, calcFee, getKeys, round, toHex, transformTx, getTransactions, getDec, calcGasPrice, tryGetLateest, getNonce, createTransaction, checkDecodedData, pushTx, checkTxStatus, getTotalReceived, getUnconfirmedBalance, getBalance, getSyncStatus, getPeerCount, toString$ = {}.toString, out$ = typeof exports != 'undefined' && exports || this;
  stringify = require('qs').stringify;
  ref$ = require('prelude-ls'), filter = ref$.filter, map = ref$.map, foldl = ref$.foldl, each = ref$.each;
  ref$ = require('../math.js'), plus = ref$.plus, minus = ref$.minus, times = ref$.times, div = ref$.div, fromHex = ref$.fromHex;
  ref$ = require('./superagent.js'), get = ref$.get, post = ref$.post;
  ref$ = require('./deps.js'), Web3 = ref$.Web3, Tx = ref$.Tx, BN = ref$.BN, hdkey = ref$.hdkey, bip39 = ref$.bip39;
  jsonParse = require('../json-parse.js');
  deadline = require('../deadline.js');
  ref$ = require('bs58'), decode = ref$.decode, encode = ref$.encode;
  Common = require('ethereumjs-common')['default'];
  ref$ = require('../addresses.js'), vlxToEth = ref$.vlxToEth, ethToVlx = ref$.ethToVlx;
  isChecksumAddress = function(address){
    var addressHash, i;
    address = address.replace('0x', '');
    addressHash = sha3(address.toLowerCase());
    i = 0;
    while (i < 40) {
      if (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i] || parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i]) {
        return false;
      }
      i++;
    }
    return true;
  };
  isAddress = function(address){
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
    } else {
      if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        return true;
      } else {
        return isChecksumAddress(address);
      }
    }
  };
  toVelasAddress = function(ethAddressBuffer){
    var s1;
    s1 = encode(ethAddressBuffer);
    return "V" + s1;
  };
  toEthAddress = function(velasAddress, cb){
    var bs58str, bytes, hex, ethAddress, err;
    if (toString$.call(velasAddress).slice(8, -1) !== 'String') {
      return cb("required velas-address as a string");
    }
    if (isAddress(velasAddress)) {
      return cb(null, velasAddress);
    }
    if (velasAddress[0] !== 'V') {
      return cb("velas address can be started with V");
    }
    return cb(null, vlxToEth(velasAddress));
    bs58str = velasAddress.substr(1, velasAddress.length);
    try {
      bytes = decode(bs58str);
      hex = bytes.toString('hex');
      ethAddress = '0x' + hex;
      return cb(null, ethAddress);
    } catch (e$) {
      err = e$;
      return cb(err);
    }
  };
  if (typeof window != 'undefined' && window !== null) {
    if (typeof window != 'undefined' && window !== null) {
      window.toEthAddress = vlxToEth;
    }
  }
  if (typeof window != 'undefined' && window !== null) {
    if (typeof window != 'undefined' && window !== null) {
      window.toVelasAddress = ethToVlx;
    }
  }
  getEthereumFullpairByIndex = function(mnemonic, index, network){
    var seed, wallet, w, address, privateKey, publicKey;
    seed = bip39.mnemonicToSeed(mnemonic);
    wallet = hdkey.fromMasterSeed(seed);
    w = wallet.derivePath("m0").deriveChild(index).getWallet();
    address = ethToVlx(w.getAddress().toString('hex'));
    privateKey = w.getPrivateKeyString();
    publicKey = w.getPublicKeyString();
    return {
      address: address,
      privateKey: privateKey,
      publicKey: publicKey
    };
  };
  tryParse = function(data, cb){
    return setImmediate(function(){
      var err;
      if (toString$.call(data.body).slice(8, -1) === 'Object') {
        return cb(null, data);
      }
      if (toString$.call(data != null ? data.text : void 8).slice(8, -1) !== 'String') {
        console.log(data);
      }
      if (toString$.call(data != null ? data.text : void 8).slice(8, -1) !== 'String') {
        return cb("expected text");
      }
      try {
        сonsole.log('try-parse', data.text, JSON.parse);
        data.body = JSON.parse(data.text);
        return cb(null, data);
      } catch (e$) {
        err = e$;
        return cb(err);
      }
    });
  };
  makeQuery = function(network, method, params, cb){
    var web3Provider, query;
    web3Provider = network.api.web3Provider;
    query = {
      jsonrpc: '2.0',
      id: 1,
      method: method,
      params: params
    };
    return post(web3Provider, query).end(function(err, data){
      var ref$;
      if (err != null) {
        return cb("query err: " + ((ref$ = err.message) != null ? ref$ : err));
      }
      return tryParse(data, function(err, data){
        var ref$;
        if (err != null) {
          return cb(err);
        }
        if (toString$.call(data.body).slice(8, -1) !== 'Object') {
          return cb("expected object");
        }
        if (((ref$ = data.body) != null ? ref$.error : void 8) != null) {
          return cb(data.body.error);
        }
        return cb(null, data.body.result);
      });
    });
  };
  out$.getTransactionInfo = getTransactionInfo = function(config, cb){
    var network, tx, query;
    network = config.network, tx = config.tx;
    query = [tx];
    return makeQuery(network, 'eth_getTransactionReceipt', query, function(err, info){
      var tx, status, result;
      if (err != null) {
        return cb(err);
      }
      tx = info != null ? info.result : void 8;
      if (toString$.call(tx).slice(8, -1) !== 'Object') {
        return cb("expected result");
      }
      status = (function(){
        switch (false) {
        case tx.status !== '0x1':
          return 'confirmed';
        default:
          return 'pending';
        }
      }());
      result = {
        from: tx.from,
        to: tx.to,
        status: status,
        info: tx
      };
      return cb(null, result);
    });
  };
  getGasEstimate = function(arg$, cb){
    var network, query, gas;
    network = arg$.network, query = arg$.query, gas = arg$.gas;
    if (gas != null) {
      return cb(null, gas);
    }
    return makeQuery(network, 'eth_estimateGas', [query], function(err, estimate){
      if (err != null) {
        return cb(null, 1000000);
      }
      return cb(null, fromHex(estimate));
    });
  };
  out$.calcFee = calcFee = function(arg$, cb){
    var network, feeType, account, amount, to, data, gasPrice, gas, dec;
    network = arg$.network, feeType = arg$.feeType, account = arg$.account, amount = arg$.amount, to = arg$.to, data = arg$.data, gasPrice = arg$.gasPrice, gas = arg$.gas;
    if (toString$.call(to).slice(8, -1) !== 'String' || to.length === 0) {
      return cb(null);
    }
    if (feeType !== 'auto') {
      return cb(null);
    }
    dec = getDec(network);
    return calcGasPrice({
      feeType: feeType,
      network: network,
      gasPrice: gasPrice
    }, function(err, gasPrice){
      var dataParsed;
      if (err != null) {
        return cb(err);
      }
      dataParsed = (function(){
        switch (false) {
        case data == null:
          return data;
        default:
          return '0x';
        }
      }());
      return toEthAddress(account.address, function(err, from){
        if (err != null) {
          return cb(err);
        }
        return toEthAddress(to, function(err, to){
          var query;
          if (err != null) {
            return cb(err);
          }
          query = {
            from: from,
            to: to,
            data: dataParsed
          };
          return getGasEstimate({
            network: network,
            query: query,
            gas: gas
          }, function(err, estimate){
            var res, val;
            if (err != null) {
              return cb(err);
            }
            res = times(gasPrice, estimate);
            val = div(res, dec);
            return cb(null, val);
          });
        });
      });
    });
  };
  out$.getKeys = getKeys = function(arg$, cb){
    var network, mnemonic, index, result;
    network = arg$.network, mnemonic = arg$.mnemonic, index = arg$.index;
    result = getEthereumFullpairByIndex(mnemonic, index, network);
    return cb(null, result);
  };
  round = function(num){
    return Math.round(+num);
  };
  toHex = function(it){
    return new BN(it);
  };
  transformTx = curry$(function(network, t){
    var url, dec, tx, amount, time, fee, recipientType, ref$;
    url = network.api.url;
    dec = getDec(network);
    network = 'eth';
    tx = t.hash;
    amount = div(t.value, dec);
    time = t.timeStamp;
    url = url + "/tx/" + tx;
    fee = div(times(t.cumulativeGasUsed, t.gasPrice), dec);
    recipientType = ((ref$ = t.input) != null ? ref$ : "").length > 3 ? 'contract' : 'regular';
    return {
      network: network,
      tx: tx,
      amount: amount,
      fee: fee,
      time: time,
      url: url,
      from: t.from,
      to: t.to,
      recipientType: recipientType
    };
  });
  out$.getTransactions = getTransactions = function(arg$, cb){
    var network, address;
    network = arg$.network, address = arg$.address;
    return toEthAddress(address, function(err, address){
      var apiUrl, module, action, startblock, endblock, sort, apikey, query;
      if (err != null) {
        return cb(err);
      }
      apiUrl = network.api.apiUrl;
      module = 'account';
      action = 'txlist';
      startblock = 0;
      endblock = 99999999;
      sort = 'asc';
      apikey = '4TNDAGS373T78YJDYBFH32ADXPVRMXZEIG';
      query = stringify({
        module: module,
        action: action,
        apikey: apikey,
        address: address,
        sort: sort,
        startblock: startblock,
        endblock: endblock
      });
      return get(apiUrl + "?" + query).timeout({
        deadline: deadline
      }).end(function(err, resp){
        var ref$;
        if (err != null) {
          return cb("cannot execute query - err " + ((ref$ = err.message) != null ? ref$ : err));
        }
        return jsonParse(resp.text, function(err, result){
          var ref$, txs;
          if (err != null) {
            return cb("cannot parse json: " + ((ref$ = err.message) != null ? ref$ : err));
          }
          if (toString$.call(result != null ? result.result : void 8).slice(8, -1) !== 'Array') {
            return cb("Unexpected result");
          }
          txs = map(transformTx(network))(
          result.result);
          return cb(null, txs);
        });
      });
    });
  };
  getDec = function(network){
    var decimals;
    decimals = network.decimals;
    return Math.pow(10, decimals);
  };
  calcGasPrice = function(arg$, cb){
    var feeType, network, gasPrice;
    feeType = arg$.feeType, network = arg$.network, gasPrice = arg$.gasPrice;
    if (gasPrice != null) {
      return cb(null, gasPrice);
    }
    if (feeType === 'cheap') {
      return cb(null, 22000);
    }
    return makeQuery(network, 'eth_gasPrice', [], function(err, price){
      var ref$;
      if (err != null) {
        return cb("calc gas price - err: " + ((ref$ = err.message) != null ? ref$ : err));
      }
      price = fromHex(price);
      if (+price === 0) {
        return cb(null, 22000);
      }
      return cb(null, price);
    });
  };
  tryGetLateest = function(arg$, cb){
    var network, account;
    network = arg$.network, account = arg$.account;
    return toEthAddress(account.address, function(err, address){
      if (err != null) {
        return cb(err);
      }
      return makeQuery(network, 'eth_getTransactionCount', [address, "latest"], function(err, nonce){
        var ref$, next;
        if (err != null) {
          return cb("cannot get nonce (latest) - err: " + ((ref$ = err.message) != null ? ref$ : err));
        }
        next = +fromHex(nonce);
        return cb(null, next);
      });
    });
  };
  getNonce = function(arg$, cb){
    var network, account;
    network = arg$.network, account = arg$.account;
    return toEthAddress(account.address, function(err, address){
      if (err != null) {
        return cb(err);
      }
      return makeQuery(network, 'eth_getTransactionCount', [address, 'pending'], function(err, nonce){
        var ref$;
        if (err != null && (((ref$ = err.message) != null ? ref$ : err) + "").indexOf('not implemented') > -1) {
          return tryGetLateest({
            network: network,
            account: account
          }, cb);
        }
        if (err != null) {
          return cb("cannot get nonce (pending) - err: " + ((ref$ = err.message) != null ? ref$ : err));
        }
        return cb(null, fromHex(nonce));
      });
    });
  };
  isAddress = function(address){
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
    } else {
      return true;
    }
  };
  out$.createTransaction = createTransaction = curry$(function(arg$, cb){
    var network, account, recipient, amount, amountFee, data, feeType, txType, gasPrice, gas, dec;
    network = arg$.network, account = arg$.account, recipient = arg$.recipient, amount = arg$.amount, amountFee = arg$.amountFee, data = arg$.data, feeType = arg$.feeType, txType = arg$.txType, gasPrice = arg$.gasPrice, gas = arg$.gas;
    dec = getDec(network);
    return toEthAddress(recipient, function(err, recipient){
      var privateKey;
      if (err != null) {
        return cb(err);
      }
      if (!isAddress(recipient)) {
        return cb("address in not correct ethereum address");
      }
      privateKey = new Buffer(account.privateKey.replace(/^0x/, ''), 'hex');
      return getNonce({
        account: account,
        network: network
      }, function(err, nonce){
        var toWei, toEth, value;
        if (err != null) {
          return cb(err);
        }
        toWei = function(it){
          return times(it, dec);
        };
        toEth = function(it){
          return div(it, dec);
        };
        value = toWei(amount);
        return calcGasPrice({
          feeType: feeType,
          network: network,
          gasPrice: gasPrice
        }, function(err, gasPrice){
          if (err != null) {
            return cb(err);
          }
          return toEthAddress(account.address, function(err, address){
            if (err != null) {
              return cb(err);
            }
            return makeQuery(network, 'eth_getBalance', [address, 'latest'], function(err, balance){
              var balanceEth, toSend, gasEstimate;
              if (err != null) {
                return cb(err);
              }
              balanceEth = toEth(balance);
              toSend = plus(amount, amountFee);
              if (+balanceEth < +toSend) {
                return cb("Balance " + balanceEth + " is not enough to send tx " + toSend);
              }
              gasEstimate = (function(){
                switch (false) {
                case gas == null:
                  return gas;
                case +gasPrice !== 0:
                  return 21000;
                default:
                  return round(div(toWei(amountFee), gasPrice));
                }
              }());
              return makeQuery(network, 'net_version', [], function(err, networkId){
                var common, txObj, tx, rawtx;
                if (err != null) {
                  return cb(err);
                }
                common = Common.forCustomChain('mainnet', {
                  networkId: networkId
                });
                txObj = {
                  nonce: toHex(nonce),
                  gasPrice: toHex(gasPrice),
                  value: toHex(value),
                  gas: toHex(gasEstimate),
                  to: recipient,
                  from: address,
                  data: data != null ? data : ""
                };
                debugger;
                tx = new Tx(txObj, {
                  common: common
                });
                tx.sign(privateKey);
                rawtx = '0x' + tx.serialize().toString('hex');
                return cb(null, {
                  rawtx: rawtx
                });
              });
            });
          });
        });
      });
    });
  });
  out$.checkDecodedData = checkDecodedData = function(decodedData, data){
    if (!(decodedData != null ? decodedData : "").length === 0) {
      return false;
    }
    if (!(data != null ? data : "").length === 0) {
      return false;
    }
  };
  out$.pushTx = pushTx = curry$(function(arg$, cb){
    var network, rawtx;
    network = arg$.network, rawtx = arg$.rawtx;
    return makeQuery(network, 'eth_sendRawTransaction', [rawtx], function(err, txid){
      var ref$;
      if (err != null) {
        return cb("cannot get signed tx - err: " + ((ref$ = err.message) != null ? ref$ : err));
      }
      return cb(null, txid);
    });
  });
  out$.checkTxStatus = checkTxStatus = function(arg$, cb){
    var network, tx;
    network = arg$.network, tx = arg$.tx;
    return cb("Not Implemented");
  };
  out$.getTotalReceived = getTotalReceived = function(arg$, cb){
    var address, network;
    address = arg$.address, network = arg$.network;
    return getTransactions({
      address: address,
      network: network
    }, function(err, txs){
      if (err != null) {
        return cb(err);
      }
      return toEthAddress(account.address, function(err, address){
        var total;
        if (err != null) {
          return cb(err);
        }
        total = foldl(plus, 0)(
        map(function(it){
          return it.amount;
        })(
        filter(function(it){
          return it.to.toUpperCase() === address.toUpperCase();
        })(
        txs)));
        return cb(null, total);
      });
    });
  };
  out$.getUnconfirmedBalance = getUnconfirmedBalance = function(arg$, cb){
    var network, address;
    network = arg$.network, address = arg$.address;
    return toEthAddress(address, function(err, address){
      if (err != null) {
        return cb(err);
      }
      return makeQuery(network, 'eth_getBalance', [address, 'pending'], function(err, number){
        var dec, balance;
        if (err != null) {
          return cb(err);
        }
        dec = getDec(network);
        balance = div(number, dec);
        return cb(null, balance);
      });
    });
  };
  out$.getBalance = getBalance = function(arg$, cb){
    var network, address;
    network = arg$.network, address = arg$.address;
    return toEthAddress(address, function(err, address){
      if (err != null) {
        return cb(err);
      }
      return makeQuery(network, 'eth_getBalance', [address, 'latest'], function(err, number){
        var dec, balance;
        if (err != null) {
          return cb(err);
        }
        dec = getDec(network);
        balance = div(number, dec);
        return cb(null, balance);
      });
    });
  };
  out$.getSyncStatus = getSyncStatus = function(arg$, cb){
    var network;
    network = arg$.network;
    return makeQuery(network, 'eth_getSyncing', [], function(err, estimate){
      if (err != null) {
        return cb(err);
      }
      return cb(null, estimate);
    });
  };
  out$.getPeerCount = getPeerCount = function(arg$, cb){
    var network;
    network = arg$.network;
    return makeQuery(network, 'net_getPeerCount', [], function(err, estimate){
      if (err != null) {
        return cb(err);
      }
      return cb(null, estimate);
    });
  };
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);