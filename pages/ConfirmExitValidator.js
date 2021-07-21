import React from "react";
import { Container, Text, Content } from "native-base";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import Images from "../Images.js";
import ButtonBlock from "../components/ButtonBlock.js";
import { WithdrawalRequest } from "../svg/index";
import Header from "../components/Header";
import getLang from "../wallet/get-lang.js";
import spin from "../utils/spin.js";

export default ({ store, web3t, props }) => {
  const changePage = (tab) => () => {
    store.current.page = tab;
  };
  const lang = getLang(store);
  const { stakingStore } = store;
  const back = () => {
    changePage("exitValidator")();
    store.amountWithdraw = null;
  }
  const okBtn = async () => {
    spin(
      store,
      lang.progressValidator || 'Validator is loading',
      async (cb) => {
        try {
          const result = await stakingStore.reloadWithRetry();
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
      changePage("detailsValidator")();
      store.amountWithdraw = null;
    });
  }
  return (
    <Container>
      <Header
        title={lang.exitValidator || "Exit from Validator"}
        smallTitle={lang.exitValidator.length > 15 ? true : false}
      />

      <Content style={style.contentBg}>
        <View style={style.container}>
          <WithdrawalRequest />
          <Text style={style.title}>
            {lang.exitValidatorTitle || "Withdrawal request has been submitted successfully. It will start cooling down from the next epoch."}
          </Text>
          <Text style={{ ...style.title, marginTop: 20 }}>
            {lang.exitValidatorSubTitle || "Please navigate to the withdrawals tab to monitor the progress."}
          </Text>
        </View>
        <View style={style.buttonBottom}>
          <ButtonBlock
            type={"OK"}
            text={lang.ok || "Ok"}
            onPress={okBtn}
          />
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

  buttonBottom: {
    marginTop: 60,
  },
  title: {
    color: "#fff",
    fontFamily: "Fontfabric-NexaRegular",
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  container: {
    marginTop: 45,
    flex: 1,
    alignItems: "center",
  },
});
