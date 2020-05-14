import React from "react";
import {
  Image,
  Clipboard,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  Text,
  Button,
  View,
  Icon,
  CardItem,
  Body,
  Header,
  Left,
  Right,
} from "native-base";
import styles from "../Styles.js";
import GradientButton from "react-native-gradient-buttons";
import { generateMnemonic } from "bip39";
import Images from '../Images.js';
import StatusBar from "../components/StatusBar.js";
import getLang from '../wallet/get-lang.js';
import BackButton from "../components/BackButton.js";

const randOrd = () => {
  return (Math.round(Math.random())-0.5);
}


export default ({ store, web3t }) => {
  const changePage = (tab) => () => {
    store.current.page = tab;
  };

  const makeRange = (from)=> {
    store.current.seed = "";
    store.current.seedIndex = 0;
    store.current.seedIndexes = [...Array(from).keys()].sort(randOrd)
    store.current.seedWords = [...Array(from).keys()].map(x=> { return "" } )
  }

  const restoreSeed1 = async () => {
    store.current.seed = "";
    makeRange(12)
    store.current.page = "restoreseed";
    // store.seedCheck = "restoreseed1";
    // console.log('store.seedCheck', store.seedCheck)
  }

  const restoreSeed2 = async () => {
    store.current.seed = "";
    makeRange(24)
    store.current.page = "restoreseed";
  }
  const lang = getLang(store);

  return (
    <View style={styles.viewFlex}>
      <ImageBackground
        source={Images.backgroundImage}
        style={styles.introBackground}
      >
        <Header transparent style={styles.mtIphoneX}>
          <Left style={styles.viewFlex}>
            <BackButton onBack={changePage("newseed")}/>
          </Left>
          <Body style={styles.viewFlex} />
          <Right style={styles.viewFlex} />
        </Header>
        <StatusBar barStyle="light-content" />
        <View style={styles.containerFlexStart}>
          <Image
            source={Images.logo}
            style={styles.styleLogo}
          />
          <View style={styles.card1}>
            <CardItem style={styles.cardItemSeed}>
              <Body>
                <View style={styles.marginBtn}>
                  <GradientButton
                    style={styles.gradientBtnPh}
                    text={"12 words"}
                    textStyle={{ fontSize: 14 }}
                    gradientBegin="#9d41eb"
                    gradientEnd="#9d41eb"
                    gradientDirection="diagonal"
                    height={50}
                    width={"100%"}
                    radius={10}
                    onPressAction={restoreSeed1}
                  />
                  <View style={{ padding: 10 }}></View>
                  <GradientButton
                    style={styles.gradientBtnPh}
                    text={"24 words"}
                    textStyle={{ fontSize: 14 }}
                    gradientBegin="#9d41eb"
                    gradientEnd="#9d41eb"
                    gradientDirection="diagonal"
                    height={50}
                    width={"100%"}
                    radius={10}
                    onPressAction={restoreSeed2}
                  />
                </View>
              </Body>
            </CardItem>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};