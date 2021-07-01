import React from "react";
import {
	ListItem,
	Left,
	Body,
	Right,
	Thumbnail,
	Text,
	Button,
	View,
	Title,
	Icon,
	Header,
	Badge
} from "native-base";
import { transaction } from "mobx";
import {observer} from "mobx-react";
import styles from "../Styles.js";
import {
	ScrollView,
	TouchableOpacity,
	Image
} from "react-native";
import RefreshControl from "../components/RefreshControl.js";
import LoadMoreDate from "../components/LoadMoreDate.js";
import walletsFuncs from "../wallet/wallets-funcs.js";
import navigate from "../wallet/navigate.js";
import StatusBar from "../components/StatusBar.js";
import getLang from '../wallet/get-lang.js';
import Background from "../components/Background.js";
import Images from '../Images.js';
import BackButton from "../components/BackButton.js";
import { LinearGradient } from "expo-linear-gradient";
import roundNumber from "../round-number";
import roundHuman from "../wallet/round-human";
import {swap} from "../wallet/wallet-funcs.js";
import {swapIcon} from "../wallet/icons.js";
import {filter, map, objToPairs, pairsToObj} from "prelude-ls";
import tokenNetworks from "../wallet/swapping/networks";


export default ({ store, web3t }) => {
	const lang = getLang(store);
	const wallets = walletsFuncs(store, web3t).wallets;
	const wallet = wallets.find((x) => x.coin.token === store.current.wallet);
	let hasSwap = wallet.network.networks != null && Object.keys(wallet.network.networks).length > 0
	/*******  Listeners  ********/
	const usdRate = wallet.usdRate || 0;
	const sendLocal = () => {
		if(wallet.balance == "..") return;
		store.current.send["to"] = "";
		store.current.send.amountSend = '0';
		store.current.send.amountSendUsd = '0';
		store.current.send.amountSendFee = '0';
		store.current.send.amountSendFeeUsd = '0';
		store.current.send.error = "";
		store.current.send.wallet = wallet;
		store.current.send.coin = wallet.coin;
		store.current.send.network = wallet.network;
		navigate(store, web3t, "send");
	};

	const swapClick = () => {
		console.log("swap click!");
		store.current.send.contractAddress = null;
		store.current.send.isSwap = true;
		if (wallet == null) {
			// return alert("Not yet loaded");
			console.log("Not yet loaded");
			return null;
		}
		if (web3t[wallet.coin.token] == null) {
			// return alert("Not yet loaded");
			console.log("Not yet loaded");
			return null;
		}
		store.current.send["to"] = "";
		store.current.send.amountSend = '0';
		store.current.send.amountSendUsd = '0';
		store.current.send.amountSendFee = '0';
		store.current.send.amountSendFeeUsd = '0';
		store.current.send.error = "";
		store.current.send.wallet = wallet;
		store.current.send.coin = wallet.coin;
		store.current.send.network = wallet.network;

		setDefaultSwapNetwork();
		navigate(store, web3t, "send");
	}
	/**
	 * Set default network for swap in Send screen.
	 * */
	const setDefaultSwapNetwork = () => {
		let availableNetworks = pairsToObj(
				filter(function(it){
					return it[1].disabled == null || it[1].disabled === false;
				})(
						objToPairs(
								wallet.network.networks)));

		let walletSwapNetworksIds = Object.keys(availableNetworks);
		if (walletSwapNetworksIds.length > 0) {
			let defaultNetwork = wallet.network.networks[walletSwapNetworksIds[0]];
			store.current.send.chosenNetwork = defaultNetwork;
			store.current.send.to = tokenNetworks.getDefaultRecipientAddress(store);
			console.log("store.current.send.to", store.current.send.to)
		} else {
			console.error("networks prop in " + store.current.send.token + " wallet is defined but is empty");
		}
	}

	const changePage = (tab) => () => {
		store.current.page = tab;
	};
	const refreshToken = () => {
		store.current.refreshingBalances = true;
		web3t.refresh((err,data) => {
			store.current.refreshingBalances = false;
			console.log("refresh done", err, data);
		})
	}
	//TODO: Refactor this piece of shit later.
	const hardCodedStrategyGetAddessPrefix = () => {
		const mapping = {
			vlx: "wallet"
		}
		return mapping[wallet.coin.token] || 'address';
	}
	const Balance = ({wallet}) => {
		const balance = wallet.balance || 0;
		const r_amount = roundNumber(balance, {decimals: 6});
		const walletBalance = roundHuman(r_amount);
		return (
				<Text style={styles.totalBalance}>
					{walletBalance}
					<Text style={styles.nameToken}>
						{" "+ (wallet.coin.nickname || wallet.coin.token).toUpperCase()}
					</Text>
				</Text>
		)
	};
	const prefix = hardCodedStrategyGetAddessPrefix();
	const addressExplorerLink = wallet.network.api.url + "/" + prefix + "/" + wallet.address;
	const expand = () => {
		transaction(function() {
			store.history.filterOpen = true;
		})
	}
	const collapse = () => {
		store.history.filterOpen = false;
	}
	const getTxContainer = () => {
		if (store.history.filterOpen == true)
			return (
					<View style={{ ...styles.viewMono, height: '80%' }}>
						<LinearGradient
								colors={[Images.velasColor4, Images.velasColor4]}
								style={styles.linearGradientBg}>
							<View style={styles.bodyBlockTitle} >
								<Text style={styles.titleHistory}>{lang.txLast}</Text>
							</View>
							<ScrollView>
								<View style={styles.viewPt} />
								{LoadMoreDate({ store })}
								<View style={{ paddingBottom: 150 }} />
							</ScrollView>
						</LinearGradient>
					</View>
			)
		return (
				<View style={styles.viewMono}>
					<LinearGradient
							colors={[Images.velasColor4, Images.velasColor4]}
							style={styles.linearGradientBg}>
						<View style={styles.bodyBlockTitle} >
							<Text style={styles.titleHistory}>{lang.txLast}</Text>
						</View>
						<ScrollView>
							<View style={styles.viewPt} />
							{LoadMoreDate({ store })}
							<View style={{ paddingBottom: 150 }} />
						</ScrollView>
					</LinearGradient>
				</View>)
	};
	const back = changePage("wallets");
	const scanQRSend = () => {
		if(wallet.balance == "..") return;
		store.current.returnPage = 'wallet';
		return store.current.page = 'Scanner';
	}
	return (
			<View style={styles.viewFlex}>
				<Background fullscreen={true}/>
				<StatusBar />
				<Header transparent style={styles.mtIphoneX}>
					<Left style={styles.viewFlexHeader}>
						<BackButton onBack={back} style={styles.arrowHeaderIconBlack}/>
					</Left>
					<Body style={styles.viewFlexHeader}>
						<Title style={styles.titleBlack}>
							{wallet.coin.name}
						</Title>
					</Body>
					<Right style={styles.viewFlexHeader}>
						<Thumbnail square small source={{uri: wallet.coin.image}} />
					</Right>
				</Header>
				{RefreshControl({transparent: true, swipeRefresh: refreshToken, store, children: <>
						<View style={styles.bodyBlockWallet}>
							<View style={styles.bodyBlock3}>
								<Text style={styles.nameTokenSwiper1}>{lang.totalBalance}</Text>
							</View>
							<View style={styles.bodyBlock3}>
								<Balance wallet={wallet}/>
							</View>
							<View style={styles.viewTouchablesWallet}>
								<View style={{ alignItems: "center" }}>
									<TouchableOpacity
											onPress={sendLocal}
											style={{ ...styles.touchables, backgroundColor: Images.colorBlue }}>
										<Image
												source={Images.withdrawImage}
												style={styles.sizeIconBtn}
										/>
									</TouchableOpacity>
									<Text style={styles.textTouchable}>{lang.send}</Text>
								</View>
								{ hasSwap && (
										<View style={{ alignItems: "center" }}>
											<TouchableOpacity
													onPress={swapClick}
													style={{ ...styles.touchables, backgroundColor: Images.colorBlue }}>
												<Thumbnail square small source={{uri: swapIcon}} style={styles.sizeIconBtn} />
											</TouchableOpacity>
											<Text style={styles.textTouchable}>Swap</Text>
										</View>
								)}
								<View style={{ alignItems: "center" }}>
									<TouchableOpacity
											onPress={scanQRSend}
											style={styles.touchables}>
										<Image
												source={Images.scanImage}
												style={styles.sizeIconScanBtn}
										/>
									</TouchableOpacity>
									<Text style={styles.textTouchable}>{lang.scan}</Text>
								</View>
								<View style={{ alignItems: "center" }}>
									<TouchableOpacity
											onPress={changePage("invoice")}
											style={{ ...styles.touchables, backgroundColor: Images.colorGreen }}
									>
										<Image
												source={Images.withdrawImage}
												style={[styles.sizeIconBtn, {transform: [{ rotate: "180deg" }], left: 0, top: 2}]}
										/>
									</TouchableOpacity>
									<Text style={styles.textTouchable}>{lang.receive}</Text>
								</View>
							</View>
						</View>
					</>})}
				{getTxContainer()}
			</View>
	);
};
