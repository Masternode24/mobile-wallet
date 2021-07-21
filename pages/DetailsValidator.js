import React from "react";
import {
  Container,
  Content,
} from "native-base";
import Footer from "./Footer.js";
import { StyleSheet, Dimensions, View } from "react-native";
import getLang from "../wallet/get-lang.js";
import Images from "../Images.js";
import TabsValidator from "../components/TabsBarValidator.js";
import Header from '../components/Header'
import DialogComponent from "../components/DialogComponent.js";


var width = Dimensions.get("window").width;

export default ({ store, web3t, props }) => {
  
  const changePage = (tab) => () => {
    store.current.page = tab;
  };
  const lang = getLang(store);

  return (
    <Container>
      <Header onBack={changePage("stakePage")} title={lang.titleValidatorDetail || 'Validator Details'} greenBack smallTitle={lang.titleValidatorDetail.length > 17 ? true : false}/>
      <View style={style.contentBg}>
        <TabsValidator store={store}/>
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  contentBg: {
    flex: 1,
    backgroundColor: Images.velasColor4
  },
});
