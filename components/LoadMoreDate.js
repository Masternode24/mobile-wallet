import React, { Component } from "react"; //import react in our code.
import { View, Text, TouchableOpacity, ActivityIndicator, Image, Platform } from "react-native";
import { List, ListItem, Left, Body, Right, Thumbnail, Header, Item, Icon, Button, Input } from "native-base";
import styles from "../Styles.js";
import moment from "moment";
import Images from "../Images.js";
import applyTransactions from '../wallet/apply-transactions.js';
import getLang from '../wallet/get-lang.js';
import roundNumber from '../round-number.js';
import roundHuman from "../wallet/round-human";
var ref$ = require('prelude-ls'), sortBy = ref$.sortBy, reverse = ref$.reverse, filter = ref$.filter, find = ref$.find, keys = ref$.keys, map = ref$.map;


const filterTxs = curry$(function(store, tx){
	var type, token, from, to, filterProps, found;
	type = tx.type, token = tx.token, from = tx.from, to = tx.to;
	filterProps = keys(
			store.current.filter);
	found = filter(function(prop){
		return store.current.filter[prop] === tx[prop];
	})(
			filterProps);
	return found.length === filterProps.length;
});
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
function in$(x, xs){
	var i = -1, l = xs.length >>> 0;
	while (++i < l) if (x === xs[i]) return true;
	return false;
}

export default ({ store, web3t }) => {
    const lang = getLang(store);
    let wallet = store.current.account.wallets[store.current.walletIndex];
    const currency = (wallet.coin.nickname != null ? wallet.coin.nickname : wallet.coin.token).toUpperCase();
    const checkType = ({type, to, txType}) => {
		if (txType) {
			return <Text style={[styles.txtSizeHistory, {textTransform: "capitalize" }]}>{txType}</Text>;
		}
		if (to === "V8sA8Q5jR44E4q6S59eUhhSJQiRBBFdZA8" || to === "0x56454c41532d434841494e000000000053574150")
			return <Text style={styles.txtSizeHistory}>{lang.swapEvm || "Swap EVM to Native"}</Text>;

		switch (type) {
        case "IN":
          return <Text style={styles.txtSizeHistory}>{lang.received}</Text>;
        case "OUT":
          return <Text style={styles.txtSizeHistory}>{lang.sent}</Text>;
        default:
          return null;
      }
    };

    const index = type => {
      if (type === "IN") return <Text>+ </Text>;
      else if (type === "OUT") return <Text>- </Text>;
    };
    const amountStyle = type => {
      if (type === "IN") return styles.styleCoinIn;
      else if (type === "OUT") return styles.styleCoinOut;
    };
    const thumbnail = type => {
      switch (type) {
        case "IN":
          return <Thumbnail small square source={Images.depositImage} />;
        case "OUT":
          return (
            <Thumbnail small square source={Images.withdrawImage2} />
          );
        default:
          return null;
      }
    };

    const txs = store.transactions.applied;		

    const showTransaction = (transaction) => {
        store.infoTransaction = transaction;
    };

    const applyFilter = () => {
        store.current.filterVal.apply = store.current.filterVal.temp;
        applyTransactions(store);
    }

    const changeSearch = (e) => {
        store.current.filterVal.temp = e;
    }

    const clearFilter = () => {
        store.current.filterVal.temp = "";
        store.current.filterVal.apply = "";
        applyTransactions(store);
    }

    const renderTransaction = (transaction) => {
		debugger;
			var r_amount = roundNumber(transaction.amount, {decimals: 2});
			var amount = roundHuman(r_amount);
			var curr = transaction.token;
			let currency_display = (function() {
				switch (curr) {
					case "vlx_native":
					case "vlx_evm":
					case "vlx2":
					case "vlx": return "VLX";
					default: return transaction.token
				}
			}());
			currency_display = currency_display.toUpperCase();
				return (
				<ListItem
					thumbnail
					underlayColor={Images.color1}
					onPress={() => {
					showTransaction(transaction);
					}}
					key={transaction.token+transaction.tx+transaction.type}
				>
				<Left>{thumbnail(transaction.type)}</Left>
				<Body style={{ paddingRight: 10 }}>
					<Text style={styles.txtSizeHistory}>
					{checkType(transaction)}
					</Text>
					<Text style={styles.constDate}>
					{transaction.time
						? moment(transaction.time * 1000).format(
							"MMM D YYYY h:mm A"
						)
						: null
					}
					</Text>
				</Body>
				<Right>
					<Text style={amountStyle(transaction.type)}>
					{index(transaction.type)}
					{amount}{"\u00A0"}{currency_display}{Platform.OS === "android" ? "\u00A0\u00A0" : null}
					</Text>
					{transaction.fee
						?(
							<Text style={styles.constDate}>
							({lang.fee}: {Math.floor(transaction.fee)}{" "}{currency_display}){Platform.OS === "android" ? "\u00A0\u00A0" : null}
							</Text>
						)
						: null
					}
				</Right>
				</ListItem>
			);
		}


    return (
      <View style={styles.container}>
        {store.history.filterOpen ? (
          <Header searchBar style={styles.headerSearchBar}>
						<Item style={{ backgroundColor: Images.color4}}>
							<Icon name="ios-search" style={{ color: "#fff"}}/>
							<Input
								placeholder="Search"
								value={store.current.filterVal.temp}
								placeholderTextColor="#fff"
								onChangeText={changeSearch}
								selectionColor={"#fff"}
								style={{ color: "#fff", backgroundColor: "transparent"}}
							/>
							<Icon name="ios-trash" onPress={clearFilter} style={{ color: "#fff"}}/>
						</Item>
						<Button transparent onPress={applyFilter}>
							<Text style={{ color: "#fff"}}>{lang.filter}</Text>
						</Button>
          </Header>
        ) : null}

        {store.current.refreshing || store.current.transactionsAreLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <View>
            {txs.length == 0 && (
              <View style={styles.footer}>
                <Image
                source={Images.trx}
                style={styles.styleLogo}
                />
              </View>
            )}
            <List>
              {txs.map(renderTransaction)}
            </List>
          </View>
        )}
      </View>
    );
}
