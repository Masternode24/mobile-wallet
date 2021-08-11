import React from "react";
import { Container, Content } from "native-base";
import { View, StyleSheet, Alert } from "react-native";
import getLang from "../wallet/get-lang.js";
import Images from "../Images.js";
import ButtonBlock from "../components/ButtonBlock.js";
import InputComponent from "../components/InputComponent";
import Notice from "../components/Notice";
import Header from "../components/Header";
import { formatStakeAmount, formatAmount } from "../utils/format-value";
import spin from "../utils/spin.js";

export default ({ store, web3t, props }) => {
  const changePage = (tab) => () => {
    store.current.page = tab;
  };
  const { stakingStore } = store;
  if (stakingStore.isRefreshing) return null;
  const details = stakingStore.getValidatorDetails();
  const lang = getLang(store);
  const TOTAL_STAKE = details.totalAvailableForWithdrawRequestStake && formatAmount(details.totalAvailableForWithdrawRequestStake);
  if (!TOTAL_STAKE) return null;
  const ADDRESS = details.address;

  const handleChange = (text) => {
    store.amountWithdraw = text;
  };

  const onPressMax = () => {
    store.amountWithdraw = TOTAL_STAKE;
  }
  // console.log('store.amountWithdraw', store.amountWithdraw)
  const onPressButton = async () => {
    if (!store.amountWithdraw) return null;
    if (parseFloat(store.amountWithdraw) > parseFloat(TOTAL_STAKE)) return null;
    const amountWithdraw = store.amountWithdraw;
    spin(
      store,
      lang.progressWithdraw || 'Withdrawal in progress',
      async (cb) => {
        try {
          const result = await stakingStore.requestWithdraw(ADDRESS, amountWithdraw);
          cb(null, result);
        } catch(err) {
          cb(err);
        }
      }
    )((err, result) => {
      if (err) {
        setTimeout(() => {
          Alert.alert(lang.wrong || 'Something went wrong. Please contact support. You can still use web interface for full staking support.');
        }, 1000);
        console.error(err);
        return;
      }
      changePage("confirmExit")();
      store.amountWithdraw = null;
    });

  }

  const back = () => {
    changePage("detailsValidator")();
    store.amountWithdraw = null;
  }

  return (
    <Container>
      <Header
        onBack={back}
        title={lang.exitValidator || "Exit from Validator"}
        smallTitle={lang.exitValidator.length > 15 ? true : false}
        identIcon={ADDRESS}
        greenBack
      />
      <Content style={style.contentBg}>
        <View>
          <InputComponent
            title={lang.enterAmount || "Enter Amount"}
            sub_text={lang.yourTotalStake || "Your Total Stake"}
            total_stake={TOTAL_STAKE}
            token="vlx"
            btnTxt={lang.useMax || "Use max"}
            value={store.amountWithdraw || ""}
            onChange={text => handleChange(text)}
            onPressMax={onPressMax}
            isWithdraw
          />
        </View>
        <View style={style.buttonTop}>
          {parseFloat(store.amountWithdraw) > parseFloat(TOTAL_STAKE) &&
            <Notice
              text={lang.noticeTrying || "You are trying to withdraw more funds than you have."}
              icon="warning"
            />
          }
          {/* On which withdrawal of funds to set a notification!!! */}
          {!details.totalWithdrawRequested || details.totalWithdrawRequested.isZero() ? null : (
            <Notice
              text={lang.noticeExitValidator || "You already have a withdrawal request. This withdrawal  is going to be combined with the previous one."}
              icon="warning"
            />
          )}
          <ButtonBlock type={!store.amountWithdraw || parseFloat(store.amountWithdraw) > parseFloat(TOTAL_STAKE) ? "DISABLED" : "WITHDRAW"} text={lang.withdraw || "Withdraw"} onPress={onPressButton} />
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
