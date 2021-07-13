import React, {useState} from "react";
import {
  Content,
  ListItem,
  Left,
  Body,
  Right,
  Text,
  View,
  Title,
  Icon,
  Separator,
  Button
} from "native-base";
import { Linking, Platform, ScrollView } from "react-native";
import Constants from 'expo-constants';
import styles from "../Styles.js";
import Footer from "./Footer.js";
import getLang from "../wallet/get-lang.js";
import PickerSetLang from "../components/PickerSetLang.js";
import PickerAccountIndex from "../components/PickerAccountIndex.js";
import Background from "../components/Background.js";
import Images from "../Images.js";
import Header from '../components/Header'

const LocalAuthListView = ({store}) => {
  const lang = getLang(store);

  const touchFinger = () => {
    if (Platform.OS === 'android') {
    return <Text style={styles.txtSettings}>{lang.touchIdAndroid}</Text>;
    }
    else if (Platform.OS === 'ios') {
      return <Text style={styles.txtSettings}>{lang.touchId} / {lang.faceId}</Text>;
    }
  }

  return (
    <ListItem
      icon
      onPress={() => {
        store.current.page = "LocalAuthenticationSettings";
      }}
      style={styles.heightListItem}
    >
      <Left>
        <Icon name="finger-print" style={styles.styleTxtSettings}/>
      </Left>
      <Body style={styles.heightListItem}>
        {touchFinger()}
      </Body>
      <Right style={styles.heightListItem}>
        <Icon name="ios-arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default ({ store, web3t }) => {
  const logoutBtn = async () => {
    store.current.page = "locked";
  };
  const lang = getLang(store);

  const termsBtn = async () => {
    store.current.page = "terms";
  };


  return (

      <View style={styles.viewFlex}>
      <Background fullscreen={true}/>
      <Header title={lang.settings}/>
        <Content>
          <Separator bordered style={styles.seperatorStyle}>
            <Text style={styles.styleTxtSeparator}>{lang.help}</Text>
          </Separator>
          <ListItem
            icon
            onPress={() => {
              Linking.openURL(`https://support.velas.com/hc/en-150`);
            }}
            underlayColor={Images.velasColor2}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="ios-text" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.support}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() => {
              Linking.openURL(`https://raw.githubusercontent.com/askucher/expo-web3/dev/Privacy.md`);
            }}
            underlayColor={Images.velasColor2}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="md-document" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.privacyPolicy}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() => {
              Linking.openURL(
                `https://raw.githubusercontent.com/askucher/expo-web3/dev/TERMS.md`
              );
            }}
            underlayColor={Images.velasColor2}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="md-document" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.termsOfUse}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <Separator bordered style={styles.seperatorStyle}>
            <Text style={styles.styleTxtSeparator}>{lang.profile}</Text>
          </Separator>
          <ListItem icon style={styles.heightListItem} underlayColor={Images.velasColor2}>
            <Left>
              <Icon name="ios-wallet" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              {PickerAccountIndex({ store, web3t })}
            </Body>
            <Right style={styles.heightListItem}/>
          </ListItem>
          <ListItem icon style={styles.heightListItem} underlayColor={Images.velasColor2}>
            <Left>
              <Icon name="md-globe" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              {PickerSetLang({ store })}
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>
          <LocalAuthListView store={store}/>

          <Separator bordered style={styles.seperatorStyle}>
            <Text style={styles.styleTxtSeparator}>Networks</Text>
          </Separator>

          <ListItem icon style={styles.heightListItem} underlayColor={Images.velasColor2}>
            <Left>
              <Icon name="ios-log-out" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>Mainnet</Text>
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>
          <ListItem icon last style={styles.heightListItem} underlayColor={Images.velasColor2}>
            <Left/>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>Custom</Text>
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>

          <Separator bordered style={styles.seperatorStyle}>
            <Text style={styles.styleTxtSeparator}>{lang.security}</Text>
          </Separator>

          <ListItem icon style={styles.heightListItem} last underlayColor={Images.velasColor2} onPress={logoutBtn}>
            <Left>
              <Icon name="ios-log-out" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.logOut}</Text>
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>



            <Separator bordered style={[styles.seperatorStyle, {backgroundColor: "transparent", opacity: 0.50}]}>
              <Text style={[styles.styleTxtSeparator, {textAlign: "center"} ]}>{lang.version} {Constants.manifest.version}</Text>
            </Separator>


          <View style={styles.paddingSettings}/>
        </Content>

        <Footer store={store}></Footer>
      </View>

  );
};
