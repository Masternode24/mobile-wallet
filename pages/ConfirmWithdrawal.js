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
  // const back = () => {
  //   changePage("exitValidator")();
  //   store.amountWithdraw = null;
  // }
  const okBtn = () => {
      changePage("detailsValidator")();
  }
  return (
    <Container>
      <Header
        // onBack={back}
        // greenBack
        title={lang.withdrawal || "Withdrawal"}
      />

      <Content style={style.contentBg}>
        <View style={style.container}>
          <WithdrawalRequest />
          <Text style={style.title}>
            {lang.withdrawalSuccessfully || "Withdrawal has been submitted successfully. It may take a few minutes to appear on your balance."}
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
