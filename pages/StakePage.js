import React, {useState} from "react";
import { Container, Text, Content, List, ListItem} from "native-base";
import Footer from "./Footer.js";
import { StyleSheet, Dimensions, View, RefreshControl, ActivityIndicator, Modal, Platform, Alert } from "react-native";
import getLang from "../wallet/get-lang.js";
import Images from "../Images.js";
import StakeItem from "../components/StakeItem.js";
import Header from "../components/Header.js";
import StakeBar from "../components/StakeBar.js";
// import Spinner from "../components/Spinner.js";

export default ({ store, web3t, props }) => {
  const { stakingStore } = store;
  const changePage = (tab, validatorAddress) => () => {
    stakingStore.openedValidatorAddress = validatorAddress;
    store.current.page = tab;
  };

  // if (!stakingStore.validators) {
  //   return <Spinner/>;
  // }


  if (stakingStore.isRefreshing) {
    const lang = getLang(store);
    return (
    <>
      <Container>
        <Header title={lang.titleStake || "Stake"} />
          <View style={style.modalBackground}>
            <View style={[style.activityIndicatorWrapper, {backgroundColor: "#ffffff30"}]}>
              <ActivityIndicator color={"white"} size={'large'}/>
            </View>
          </View>
        <Footer store={store}></Footer>
      </Container>
    </>
    )
  }

  const lang = getLang(store);

  const filterStake = stakingStore.getStakedValidators();
  const filterTotalStaked = stakingStore.getNotStakedValidators();

  if (!filterStake || !filterTotalStaked) {
    return null;
  }
  const renderItemsMyStake = filterStake.map((el) => (
    <StakeItem
      key={el.address}
      typeBadge={el.status}
      address={el.address}
      myStake={el.myStake}
      apr={el.apr}
      onPress={changePage("detailsValidator", el.address)}
      store={store}
      isStaked
    />
  ));
  const renderItemsTotalValidators = filterTotalStaked.map((el) => (
    <StakeItem
      key={el.address}
      typeBadge={el.status}
      address={el.address}
      totalStaked={el.activeStake}
      apr={el.apr}
      onPress={changePage("detailsValidator", el.address)}
      store={store}
    />
  ));
  const EmptyList = () => {
    return (
      <View style={style.listItemStyle}>
        <Text style={style.styleSubTitle}>{lang.nothingToShow}</Text>
      </View>
    );
  };
  const refreshStakeItem = () => {
    stakingStore.reloadWithRetry();
  };
  
  return (
    <Container>
      <Header title={lang.titleStake || "Stake"} />
      <StakeBar/>
      <Content style={{ backgroundColor: Images.velasColor4 }}
      refreshControl={
        <RefreshControl
        refreshing={false}
        onRefresh={refreshStakeItem}
        tintColor="#fff"
        />
      }
      >
        <List>
          <ListItem itemHeader noBorder>
            <Text style={style.titleText}>
              {lang.itemStakedTitle || "Staked Validators"}
            </Text>
          </ListItem>
          {!renderItemsMyStake.length ? <EmptyList /> : renderItemsMyStake}
          <ListItem itemHeader noBorder>
            <Text style={style.titleText}>
              {lang.itemValidatorsTitle || "Other Validators"}
            </Text>
          </ListItem>
          {!renderItemsTotalValidators.length ? <EmptyList /> : renderItemsTotalValidators}
        </List>
      </Content>
      <Footer store={store}></Footer>
    </Container>
  );
};

const style = StyleSheet.create({
  titleText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Fontfabric-NexaBold",
    // marginRight: 10
  },
  listItemStyle: {
    marginHorizontal: 20,

    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  styleSubTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Fontfabric-NexaRegular",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: Images.velasColor4
  },
  activityIndicatorWrapper: {
    backgroundColor: "#00000030",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
