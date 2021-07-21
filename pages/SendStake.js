import React, {useState} from "react";
import { Container, Content } from "native-base";
import { View, StyleSheet, Dimensions } from "react-native";
import getLang from "../wallet/get-lang.js";
import Images from "../Images.js";
import ButtonBlock from "../components/ButtonBlock.js";
import InputComponent from "../components/InputComponent";
import Header from "../components/Header";
import { formatStakeAmount, formatAmount } from "../utils/format-value";
import Notice from "../components/Notice";
import BN from 'bn.js';

export default ({ store, web3t, props }) => {
  // const [value, setValue] = useState();

  const changePage = (tab) => () => {
    store.current.page = tab;
  };
  const { stakingStore } = store;
  if (stakingStore.isRefreshing) return null;
  const details = stakingStore.getValidatorDetails();
  const ADDRESS = details.address;
  const TOTAL_STAKE = !details.myStake.isZero() ? formatStakeAmount(details.myStake) : formatStakeAmount(details.activeStake);

  const AVAILABLE_BALANCE = details.available_balance;

  const handleChange = (text) => {
    store.amount = text;
  };
  console.log('store.amount', store.amount)
  
  const amountToBN = (amount) => {
    if (!parseFloat(amount)) {
      return new BN(0);
    }
    const parts = amount.split(".");
    if (!parts[1]) {
      return new BN(parts[0] + '000000000', 10);
    }
    return new BN(parts[0] + parts[1] + '000000000'.slice(parts[1].length), 10);
  };

  const onPressMax = () => {
    if (AVAILABLE_BALANCE.sub(new BN(1e9)).lt(new BN('10000000', 10))) {
      return null;
    }
    store.amount = formatAmount(AVAILABLE_BALANCE.sub(new BN(1e9)));
  }
  const onPressButton = () => {
    if (!store.amount || parseFloat(store.amount) && amountToBN(store.amount).gte(AVAILABLE_BALANCE.sub(new BN(1e9)))) return null;
    changePage("confirmStake")();
  }
  const back = () => {
    changePage("detailsValidator")();
    store.amount = null;
  }
  const lang = getLang(store);
  return (
    <Container>
      <Header
        onBack={back}
        greenBack
        title={lang.stake || "Stake"}
        identIcon={ADDRESS}
      />
      <Content style={style.contentBg}>
        <View>
          <InputComponent
            title={lang.enterAmount || "Enter Amount"}
            sub_text={lang.availableStaking || "Available for staking"}
            available_balance={formatStakeAmount(AVAILABLE_BALANCE)}
            total_stake={TOTAL_STAKE}
            token="vlx"
            btnTxt={lang.useMax || "Use max"}
            value={store.amount || ""}
            onChange={text => handleChange(text)}
            onPressMax={onPressMax}
            />
        </View>
        <View style={style.buttonTop}>
          {/* {store.amount > formatStakeAmount(AVAILABLE_BALANCE) ?
            <Notice
              text={"You are trying to enter more than you have available on the balance sheet!!"}
              icon="warning"
            /> 
            : null } */}
          {parseFloat(store.amount) && amountToBN(store.amount).gte(AVAILABLE_BALANCE.sub(new BN(1e9))) ?
          <Notice
              text={lang.dontStake || "Don’t stake all coins, leave some (~1 VLX) to pay transaction fees in the future and be able to initiate stake withdrawals."}
              icon="warning"
            /> : null }
          <ButtonBlock type={!store.amount || parseFloat(store.amount) && amountToBN(store.amount).gte(AVAILABLE_BALANCE.sub(new BN(1e9))) ? "DISABLED" : "NEXT"} text={lang.continue || "Next"} onPress={onPressButton} />
        </View>
      </Content>
    </Container>
  );
};


const style = StyleSheet.create({
  contentBg: {
    backgroundColor: Images.velasColor4,
    // justifyContent: "space-between",
    // flex: 1,
  },
  buttonTop: {
    marginTop: 20,
  },
});
