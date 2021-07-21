import React, { useState } from "react";
import {
	Left,
	Right,
	Text,
	Button,
	View,
	Icon,
	Item,
	Input,
	Title,
	Body,
	Thumbnail,
	Label,
	Toast
} from "native-base";
import { observe } from "mobx";
import styles from "../Styles.js";
import RefreshControl from "../components/RefreshControl.js";
import sendFuncs from "../wallet/send-funcs.js";
import walletsFuncs from "../wallet/wallets-funcs.js";
import Spinner from "../utils/spinner.js";
import StatusBar from "../components/StatusBar.js";
import NetworkSlider from "../components/sliders/network-slider"
import getLang from "../wallet/get-lang.js";
import BackButton from "../components/BackButton.js";
import Background from "../components/Background.js";
import Images from "../Images.js";
import {
	Image, TouchableOpacity
} from "react-native";
import { RadioButton } from 'react-native-paper';
import roundNumber from '../round-number';
import roundHuman from '../wallet/round-human';
import Header from '../components/Header'
import InputAmount from '../components/InputAmount'




const wrapNumber = (text) => {
	return {
		target: {
			value: text.replace(",", ".").replace(/[^0-9\.]/g, ""),
		},
	};
};

const wrap = (text) => {
	return {
		target: {
			value: text,
		},
	};
};
const RadioButtons = () => {
	const [checked, setChecked] = React.useState('slow');

	return (
			<View style={styles.inputContainerRadio}>

				<View style={styles.radioField}>
					<TouchableOpacity
							style={checked === 'slow' ? styles.borderRadioCheck : styles.borderRadio}
							onPress={() => setChecked('slow')}>
						<View style={styles.radioField}>
							<RadioButton
									value="slow"
									status={checked === 'slow' ? 'checked' : 'unchecked'}
									onPress={() => setChecked('slow')}
									color={'yellow'}
									uncheckedColor={'rgba(255,255,255,0.60)'}
							/>
							<Text style={checked === 'slow' ? styles.txtRadioCheck : styles.txtRadio}>Slow</Text>
						</View>
						<Item style={styles.borderItemRadio}>
							<Input
									returnKeyType="done"
									autoCompleteType="off"
									style={checked === 'slow' ? styles.inputStyleRadioCheck : styles.inputStyleRadio}
									selectionColor={'#fff'}
									keyboardAppearance="dark"
									placeholder="0.00"
									value={'10.00 $'}
									keyboardType="numeric"
									placeholderTextColor="rgba(255,255,255,0.60)"
									disabled={true}
							/>
						</Item>
					</TouchableOpacity>
				</View>

				<View style={styles.radioField}>
					<TouchableOpacity
							style={checked === 'custom' ? styles.borderRadioCheck : styles.borderRadio}
							onPress={() => setChecked('custom')}>
						<View style={styles.radioField}>
							<RadioButton
									value="custom"
									status={checked === 'custom' ? 'checked' : 'unchecked'}
									onPress={() => setChecked('custom')}
									color={'yellow'}
									uncheckedColor={'rgba(255,255,255,0.60)'}
							/>
							<Text style={checked === 'custom' ? styles.txtRadioCheck : styles.txtRadio}>Custom</Text>
						</View>
						<Item style={styles.borderItemRadio}>
							<Input
									returnKeyType="done"
									autoCompleteType="off"
									style={checked === 'custom' ? styles.inputStyleRadioCheck : styles.inputStyleRadio}
									selectionColor={'#fff'}
									keyboardAppearance="dark"
									placeholder="0.00"
									value={'10.00 $'}
									keyboardType="numeric"
									placeholderTextColor="rgba(255,255,255,0.60)"
									disabled={true}
							/>
						</Item>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
						style={checked === 'fast' ? styles.borderRadioCheck : styles.borderRadio}
						onPress={() => setChecked('fast')}>
					<View style={styles.radioField}>
						<RadioButton
								value="fast"
								status={checked === 'fast' ? 'checked' : 'unchecked'}
								onPress={() => setChecked('fast')}
								color={'yellow'}
								uncheckedColor={'rgba(255,255,255,0.60)'}
						/>
						<Text style={checked === 'fast' ? styles.txtRadioCheck : styles.txtRadio}>Fast</Text>
					</View>
					<Item style={styles.borderItemRadio}>
						<Input
								returnKeyType="done"
								autoCompleteType="off"
								style={checked === 'fast' ? styles.inputStyleRadioCheck : styles.inputStyleRadio}
								selectionColor={'#fff'}
								keyboardAppearance="dark"
								placeholder="0.00"
								value={'10.00 $'}
								keyboardType="numeric"
								placeholderTextColor="rgba(255,255,255,0.60)"
								disabled={checked === 'fast' ? false : true}
						/>
					</Item>
				</TouchableOpacity>
			</View>
	);
};


export default ({ store, web3t }) => {
	const lang = getLang(store);
	const {
		feeToken,
		recipientChange,
		amountChange,
		amountUsdChange,
		checkRecipientAddress,
	} = sendFuncs(store, web3t);

	const wallets = walletsFuncs(store, web3t).wallets;
	const wallet = wallets.find((x) => x.coin.token === store.current.wallet);

	const changePage = (tab) => () => {
		store.current.page = tab;
	};

	const send = store.current.send;
	const scanQRSend = () => {
		if (isNaN(wallet.balance)) return;
		store.current.returnPage = 'send';
		return store.current.page = 'Scanner';
	}

	const btnWithdraw = ({ store, web3t }) => {
		const { send, beforeSendAnyway } = sendFuncs(store, web3t);
		const withdraw = async () => {
			try {
				store.current.send.error = "";
				beforeSendAnyway();
			} catch (e) {
				console.error(e);
				Toast.show({text: e.message});
			}
		};
		const lang = getLang(store);
		const sendText = lang.send;
		const disabled = (!((!send.error || send.error.length === 0) && (+send.amountSend > 0))) || (send.amountChanging === true) || (store.current.creatingTransaction === true);
		return (
				<Button block style={disabled ? styles.buttonInactive : styles.btnVelasActive} onPress={withdraw} disabled={disabled}>
					<Text style={styles.textBtn}>{sendText}</Text>
				</Button>
		);
	};

	const InputAddressWithdraw = ({ send }) => (
			<Item style={styles.borderItem}>
				<Input
						onChangeText={(text) => recipientChange(wrap(text))}
						onBlur={() => checkRecipientAddress()}
						returnKeyType="done"
						selectionColor={"#fff"}
						keyboardAppearance="dark"
						placeholder={wallet.network.mask.substring(25, wallet.network.mask.length - 255 ) + "..."}
						style={[styles.inputStyle, { fontSize: 18 }]}
						value={send["to"]}
						keyboardType={"default"}
						placeholderTextColor="rgba(255,255,255,0.60)"
				/>
				<TouchableOpacity
						onPress={scanQRSend}
						style={{ backgroundColor: 'transparent',  width: 50}}
				>
					<Image
							source={Images.scanImage}
							style={styles.sizeIconBtn1}
					/>
				</TouchableOpacity>
			</Item>
	);

	const SendButton = ({ send, error }) =>
			btnWithdraw({ store, web3t})
	;

	const refreshToken = async (bool) => {
		store.current.refreshingBalances = true;
		web3t.refresh((err, data) => {
			store.current.refreshingBalances = false;
		});
	};
	const pad =
			{ paddingTop: 10 };
	const back = changePage("wallet", true);
	const balance = wallet.balance;
	const r_amount = roundNumber(balance, {decimals: 6});
	const walletBalance = roundHuman(r_amount);
	const ScreenTitle = send.isSwap ? lang.swapBtn : lang.send;
	return (
			<View style={styles.viewFlex}>
				<Background fullscreen={true}/>

            <Header title={ScreenTitle} onBack={back} coin={wallet.coin.image}/>

				<StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'}/>
				{RefreshControl({swipeRefresh:refreshToken, store, children:<>
						<View style={styles.bodyBlockWallet}>
							<View style={styles.bodyBlock3}>
								<Text style={styles.nameTokenSwiper1}>{lang.totalBalance}</Text>
							</View>
							<View style={styles.bodyBlock3}>
								<Text style={styles.totalBalance}>
									{walletBalance}
									<Text style={styles.nameToken}>
										{" "+(wallet.coin.nickname || wallet.coin.token).toUpperCase()}
									</Text>
								</Text>
							</View>
							<View style={[styles.widthCard, { marginHorizontal: 20, width: '90%' }]}>
								{NetworkSlider({store, web3t, wallet})}
								<View style={styles.titleInputSend}>
									<Text style={styles.titleInput1}>{lang["to"]}:</Text>
								</View>
								{InputAddressWithdraw({send: store.current.send})}
								<View style={pad}></View>

								<View style={styles.titleInputSend}>
									<Text style={styles.titleInput1}>{lang.amount}:</Text>
								</View>

								<View >
									<Item style={[styles.borderItem, {height: 50}]}>
										<InputAmount
												onChangeText={(text) => amountChange(wrapNumber(text))}
												returnKeyType="done"
												autoCompleteType="off"
												style={[styles.inputStyle, { fontSize: 18, width: "100%" }]}
												selectionColor={"#fff"}
												keyboardAppearance="dark"
												placeholder="0.00"
												value={send.amountSend}
												keyboardType="numeric"
												placeholderTextColor="rgba(255,255,255,0.60)"
											maxLength={20}
                      maxFractionLength={9}
										/>

									</Item>

									{!(wallet.coin.token === 'syx' || wallet.coin.token === 'syx2') &&
									<Item style={[styles.borderItem, {height: 50}]}>
										<Text style={{color: "white"}}>$ </Text>
										<InputAmount
												onChangeText={(text) => amountUsdChange(wrapNumber(text))}
												returnKeyType="done"
												autoCompleteType="off"
												style={[styles.inputStyle, { fontSize: 18, width: "100%"}]}
												selectionColor={"#fff"}
												keyboardAppearance="dark"
												placeholder="0.00"
												value={send.amountSendUsd}
												keyboardType="numeric"
												placeholderTextColor="rgba(255,255,255,0.60)"
											maxLength={20}

										/>
									</Item>
									}
								</View>


								<View style={pad}></View>

								<View style={styles.titleInputSend}>
									<Text style={styles.titleInput1}>{lang.fee}:</Text>
								</View>
								{/* <RadioButtons/> */}
								<Text style={styles.textInputDownRight}>
									{lang.fee} {send.amountSendFee}{" "} {feeToken} (${send.amountSendFeeUsd})
								</Text>
								<Text style={styles.error}>{send.error}</Text>

							</View>
							<View style={styles.containerScreen}>
								{/* <View style={styles.marginBtn}> */}
								{SendButton({send: store.current.send, error: send.error})}
								{/* </View> */}
							</View>
						</View>
						<View style={styles.paddingWithdraw}/>
					</>})}
			</View>
	);
}
