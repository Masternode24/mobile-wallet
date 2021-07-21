import React from "react";
import { Container, Text, Content } from "native-base";
import { View, StyleSheet, Dimensions, Linking } from "react-native";
import Images from "../Images.js";
import ButtonBlock from "../components/ButtonBlock.js";
import { StakingEnteranceIcon } from "../svg/index";
import Header from '../components/Header'
import getLang from "../wallet/get-lang.js";

var width = Dimensions.get("window").width;
const URL = "https://support.velas.com/hc/en-150/articles/360021044820-Delegation-Warmup-and-Cooldown";

export default ({ store, web3t, props }) => {
  const changePage = (tab) => () => {
    store.current.page = tab;
  };
  const onPressLink = () => {
    Linking.openURL(URL);
  };
  const lang = getLang(store);

  return (
    <Container>
      <Header title={lang.stakingEnterance || "Staking Enterance"}/>
      <Content style={style.contentBg}>
        <View style={style.container}>
          <StakingEnteranceIcon />
          <Text style={style.title}>
            {lang.stakingEnteranceTitle || "Stake account has been created successfully"}
          </Text>
          <Text style={style.subTitle}>
            {lang.stakingEnteranceSubTitle || "It is not fully active immediately, it may take multiple epochs to warm it up."}
          </Text>
          <Text style={style.link} onPress={onPressLink}>
            {lang.read || "Read more"}
          </Text>
        </View>
        <View style={style.buttonBottom}>
          <ButtonBlock type={"OK"} text={lang.ok || "Ok"} onPress={changePage("stakePage")} />
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
  },
  subTitle: {
    color: "rgba(255, 255, 255, 0.60)",
    fontFamily: "Fontfabric-NexaRegular",
    fontSize: 18,
    textAlign: "center",
    marginTop: 30,
  },
  container: {
    marginTop: 45,
    flex: 1,
    alignItems: "center",
  },
  link: {
    color: Images.colorBlue,
    textDecorationLine: "underline",
    marginTop: 20,
    fontFamily: "Fontfabric-NexaRegular",
  },
});
