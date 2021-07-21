import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, Clipboard, Vibration, Alert, ScrollView, ActivityIndicator } from "react-native";
import { Icon, Tab, Tabs, TabHeading, ScrollableTab, Container } from "native-base";
import { Observer, observer } from "mobx-react";
import Images from "../Images";
import { ChartIcon, PercentIcon, PlusIcon, ValidatorsIcon, VelasIcon } from "../svg/index";
import ValidatorCard from "./ValidatorCard";
import ButtonBlock from "../components/ButtonBlock.js";
import DetailsValidatorComponent from "../components/DetailsValidatorComponent.js";
import TableRewards from "../components/TableRewards";
import getLang from "../wallet/get-lang.js";
import { formatStakeAmount } from "../utils/format-value";
import BN from 'bn.js';
import spin from "../utils/spin.js";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';



const GRAY_COLOR = "rgba(255, 255, 255, 0.18)";


export default ({ store, web3t }) => {
  const { stakingStore } = store;

  const changePage = (tab) => () => {
    store.current.page = tab;
  };
  
  const [index, setIndex] = React.useState(0);
  const lang = getLang(store);
  const [routes] = React.useState([
    { key: 'first', title: lang.tabStake || "Stake", type: "STAKE" },
    { key: 'second', title: lang.tabWithdrawals || 'Withdrawals', type: "WITHDRAW" },
    { key: 'third', title: lang.tabRewards || 'Rewards', type: "REWARDS"}
  ]);


  // const lang = getLang(store);
  return (
    <Observer>{() => {
      if (stakingStore.isRefreshing) return null;
      const details = stakingStore.getValidatorDetails();
      const DOMINANCE_VALUE = details.dominance === null ? '...' : (details.dominance).toFixed(4);
      const QUALITY_VALUE = details.quality >= -10 && details.quality <= 10 ? 0 : details.quality;
      const ANNUAL_RATE = details.annualPercentageRate === null ? '...' : details.annualPercentageRate;
      const ACTIVE_STAKE = details.myActiveStake === null ? '...' : details.myActiveStake;

      const WITHDRAW_REQUESTED = details.totalWithdrawRequested;
      const AVAILABLE_WITHDRAW = details.availableWithdrawRequested;

      const ADDRESS = details.address;
      const onPressWithdraw = async () => {
        if (!details.availableWithdrawRequested) return null;
        spin(
          store,
          lang.progressWithdraw || 'Withdrawal in progress',
          async (cb) => {
          try {
            const result = await stakingStore.withdrawRequested(ADDRESS);
            const result1 = await stakingStore.reloadWithRetry();
            cb(null, result, result1);
          } catch(err) {
            cb(err);
          }
        }
        )((err, result, result1) => {
          if (err) {
            setTimeout(() => {
          Alert.alert(lang.wrong || 'Something went wrong. Please contact support. You can still use web interface for full staking support.');
        }, 1000);
            console.error(err);
            return;
          }
          changePage("confirmWithdrawal")();
        });

      }

      const copyAddress = async () => {
        const DURATION = 1000/10;
        await Clipboard.setString(details.address);
        Vibration.vibrate(DURATION);
        Alert.alert(lang.copied, "", [{ text: lang.ok }]);
      };
      const Stake = observer(() => {
        return (
        <ScrollView>
          <View style={style.container}>
            <ValidatorCard
              value={DOMINANCE_VALUE}
              subtitle={lang.dominance || "DOMINANCE"}
              info={
                lang.info1 ||
                "Relative validator weight compared to the average. Lower is better"
              }
              cardIcon={<ChartIcon />}
            />
            <ValidatorCard
              value={QUALITY_VALUE}
              subtitle={lang.quality || "QUALITY"}
              info={lang.infoMeans || "0 means average"}
              cardIcon={<PlusIcon />}

            />
            <ValidatorCard
              value={ANNUAL_RATE}
              subtitle={lang.annual || "ANNUAL PERCENTAGE RATE"}
              info={
                lang.info3 ||
                "APR is calculated based on the results of the previous epoch"
              }
              cardIcon={<PercentIcon />}
              subtitleSmall
            />
            <ValidatorCard
              value={ACTIVE_STAKE}
              subtitle={lang.activeStake || "YOUR ACTIVE STAKE"}
              info={
                lang.info4 ||
                "Only 25% of active stake can be activated per epoch. "
              }
              readMore={lang.read || "Read more"}
              link={
                "https://support.velas.com/hc/en-150/articles/360021044820-Delegation-Warmup-and-Cooldown"
              }
              cardIcon={<PercentIcon />}
              subtitleSmall
            />
          </View>
            <ButtonBlock
              type={"STAKE_MORE"}
              text={details.totalActiveStake ? lang.stakeMore || "Stake More" : "Loading..."}
              onPress={changePage("sendStake")}
            />
            { details.totalAvailableForWithdrawRequestStake && details.totalAvailableForWithdrawRequestStake.gte(stakingStore.rent) &&
              <ButtonBlock
                type={"REQUEST_WITHDRAW"}
                text={lang.requestWithdraw || "Request Withdraw"}
                onPress={changePage("exitValidator")}
              />
            }
        </ScrollView>
        )
      });
      const Withdrawals  = observer(() => {
        return (
        <ScrollView>
          <View style={style.container}>
            <ValidatorCard
              value={WITHDRAW_REQUESTED ? formatStakeAmount(WITHDRAW_REQUESTED) : '...'}
              subtitle={lang.totalWithdraw || "TOTAL WITHDRAW REQUESTED"}
              cardIcon={<VelasIcon />}
              info={lang.totalWithdraw || "TOTAL WITHDRAW REQUESTED"}
              subtitleSmall
            />
            <ValidatorCard
              value={AVAILABLE_WITHDRAW ? formatStakeAmount(AVAILABLE_WITHDRAW) : '...'}
              subtitle={lang.availableWithdraw || "AVAILABLE FOR WITHDRAW"}
              cardIcon={<VelasIcon />}
              info={lang.availableWithdraw || "AVAILABLE FOR WITHDRAW"}
              subtitleSmall
            />
        </View>
          {!details.availableWithdrawRequested || details.availableWithdrawRequested.isZero() ? null :
          <ButtonBlock
            type={"WITHDRAW"}
            text={lang.withdraw || "Withdraw"}
            onPress={onPressWithdraw}
          />
          }
        </ScrollView>
        )
      });
      const Rewards  = () => {
        return (
        <>
          <TableRewards store={store} />
        </>
        )
      };
      const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            return <Stake/>;
          case 'second':
            return <Withdrawals />;
          case 'third':
            return <Rewards />;
          default:
            return null;
        }
      };
      const BORDER_COLOR = "rgba(255, 255, 255, 0.18)";

      const renderTabBar = props => (
        <TabBar
          {...props}
          renderIcon={({ route, focused }) => (
            <ValidatorsIcon
              fill={focused ? Images.colorGreen : GRAY_COLOR}
              type={route.type}
            />
          )}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color: focused ? Images.colorGreen : GRAY_COLOR, fontFamily: "Fontfabric-NexaRegular", fontSize: 14 }}>
              {route.title}
            </Text>
          )}
          indicatorStyle={{ backgroundColor: Images.colorGreen }}
          style={{ backgroundColor: Images.velasColor4,  }}
          activeColor={Images.colorGreen}
          inactiveColor={GRAY_COLOR}
          tabStyle={{flexDirection: 'row', borderBottomColor: BORDER_COLOR, borderBottomWidth: 0.5}}
        />
      );
      return <>
        <DetailsValidatorComponent
          address={details.address}
          copyAddress={copyAddress}
          isActive={details.status === "active" ? true : false}
          value1={details.commission}
          value2={!details.myStake.isZero() ? `${formatStakeAmount(details.myStake)} VLX` : `${formatStakeAmount(details.activeStake)} VLX`}
          subtitle1={lang.validatorInterest || "VALIDATOR INTEREST"}
          subtitle2={
            !details.myStake.isZero()
              ? lang.myStake || "MY STAKE"
              : lang.totalStake || "TOTAL STAKE"
          }
          store={store}
        />
      {!details.myStake.isZero() ?
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{backgroundColor: Images.velasColor4}}
          initialLayout={{ width: Dimensions.get('window').width}}
          renderTabBar={renderTabBar}
        />
      :
      <ScrollView>
        <View style={style.container}>
          <ValidatorCard
            value={DOMINANCE_VALUE}
            subtitle={lang.dominance || "DOMINANCE"}
            info={
              lang.info1 ||
              "Relative validator weight compared to the average. Lower is better"
            }
            cardIcon={<ChartIcon />}
          />
          <ValidatorCard
            value={QUALITY_VALUE}
            subtitle={lang.quality || "QUALITY"}
            info={lang.infoMeans || "0 means average"}
            cardIcon={<PlusIcon />}
          />
      </View>
        <ButtonBlock
          type={"STAKE"}
          text={lang.stake || "Stake"}
          onPress={changePage("sendStake")}
        />
      </ScrollView>
    }
    </>}}</Observer>
  );
};

const style = StyleSheet.create({
  activeTextStyle: {
    color: Images.colorGreen,
    fontSize: 14,
    marginLeft: 5,
    fontFamily: "Fontfabric-NexaRegular",
  },
  inactiveTextStyle: {
    color: GRAY_COLOR,
    fontSize: 14,
    marginLeft: 5,
    fontFamily: "Fontfabric-NexaRegular",
  },
  tabStyle: {
    backgroundColor: Images.velasColor4,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 15,
  },
  btnBottom: {
    marginBottom: 20
  },
});
