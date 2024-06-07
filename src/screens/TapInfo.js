/* @flow */
import config from '../config';
import React, {Component} from 'react';
import {useSelector} from 'react-redux';
import {SelectTypeServing} from '../components/Modals';
import {QtyCell, OptionQtyCell} from '../components/cells';
// import DeviceInfo from 'react-native-device-info';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import AndroidPrompt from '../components/Modals/AndroidPrompt';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
} from 'react-native';
import socket from '../config/socket';

import {
    Pressable,
    useWindowDimensions,
  } from 'react-native';
  import { useCardAnimation } from '@react-navigation/stack';

// const phoneModel = DeviceInfo.getModel();
const Detail = ({route, navigation}) => {
    const { height } = useWindowDimensions();
    const { current } = useCardAnimation();
  const {line, beer, keg} = route.params.data;
  //   const {lines, beers, kegs} = useSelector((state) => state.beerReducer);
  //   const line = lines.find((line) => line.noLinea === noLinea);
  //   const keg = kegs.find((keg) => keg._id === line.idKeg); //Encontrar de los barriles, un  barril y que ese barril tenga el mismo id que el barril de la linea
  //   const beer = beers.find((beer) => beer._id === keg.beerId);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(0);
  const [userId, setUserId] = React.useState(null);
  const androidPromptRef = React.useRef();
  const ref = React.useRef();

  const image = beer.cloudImage ? {uri: beer.cloudImage} : config.images.logo;
  const qtyList = [
    {concept: 'Degustación', options: [{qty: '2oz'}]},
    {concept: 'Copa', options: [{qty: '5oz'}]},
  ];

  React.useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      NfcManager.unregisterTagEvent().catch(() => 0);

      const formattedString = tag.id.replace(/(..)/g, '$1 ').trim();
      setUserId(formattedString);

      socket.emit('getWorker',{ cardId: formattedString });

      if (Platform.OS === 'android') androidPromptRef.current.setVisible(false);

      console.warn(formattedString);
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [userId]);

  const _renderQTY = ({item, index}) => {
    return (
      <QtyCell
        item={item}
        onPress={() => {
          if (item.options.length == 1) handleVisible(true);
          else ref.current.scrollToEnd({animated: true});

          setSelectedIndex(index);
        }}
      />
    );
  };
  const _renderQTYOption = ({item}) => {
    return <OptionQtyCell item={item} onPress={() => handleVisible(true)} />;
  };
  const handleVisible = async value => {
    await NfcManager.registerTagEvent();
    if (Platform.OS === 'android') {
      androidPromptRef.current.setVisible(true);
    }
    // setModalVisible(value);
  };

  const handleServingType = selection => {
    setModalVisible(false);
  };

  return (
    <View style={styles.layout}>
        <Animated.View
        style={[
          {
            height: height,
            transform: [
              {
                translateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, height * 0.1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
          styles.viewAnimated,
        ]}>
      <View style={styles.dragger} />
      <View style={styles.cartWrapper}>
        <View style={styles.infoWrapper}>
          <Image
            blurRadius={10}
            source={image}
            style={[styles.beerImage, {position: 'absolute'}]}
          />
          <Image
            resizeMode={'contain'}
            source={image}
            style={styles.beerImage}
          />
          <View style={styles.topDetails}>
            <View style={styles.NameyStyleWrapper}>
              <Text numberOfLines={1} style={styles.beerName}>
                {beer.name}
              </Text>
              <Text style={styles.styleName}>
                -{beer.style} {userId}
              </Text>
            </View>
          </View>
          <Animated.ScrollView
            horizontal={true}
            decelerationRate="fast"
            scrollEnabled={false}
            ref={ref}
            showsHorizontalScrollIndicator={false}
            style={{paddingTop: 10}}
            snapToInterval={config.width}>
            <View style={styles.bottomDetails}>
              <Text style={[styles.styleName, styles.separatorText]}>
                Concepto
              </Text>
              <FlatList
                contentContainerStyle={{}}
                style={{width: 345}}
                data={qtyList}
                scrollEnabled={false}
                renderItem={_renderQTY}
                keyExtractor={item => item.qty}
                numColumns={2}
              />
            </View>
            <View style={styles.bottomDetails}>
              <Text style={[styles.styleName, styles.separatorText]}>
                {qtyList[selectedIndex].concept}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  ref.current.scrollTo({x: 0, y: 0, animated: true})
                }
                style={styles.backBtn}>
                <Text style={styles.backBtnText}>
                  <FontAwesome
                    size={18}
                    color={'whitesmoke'}
                    name="angle-left"
                  />
                  Atrás
                </Text>
              </TouchableOpacity>
              <View style={styles.bottomSeparator} />

              <FlatList
                style={{width: config.width}}
                data={qtyList[selectedIndex].options}
                renderItem={_renderQTYOption}
                keyExtractor={item => item.qty}
              />
            </View>
          </Animated.ScrollView>
        </View>
      </View>
        </Animated.View>
      <SelectTypeServing
        handleVisible={() => setModalVisible(false)}
        visible={modalVisible}
      />
      <AndroidPrompt
        ref={androidPromptRef}
        onCancelPress={() => {
          NfcManager.unregisterTagEvent().catch(() => 0);
        }}
      />
    </View>
  );
};
export default Detail;
const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  infoWrapper: {
    flex: 1,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 5,
    width: '100%',
    borderColor: 'rgba(255,255,255,.3)',
    backgroundColor: '#282c34',
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  dragger: {
    width: 150,
    height: 4,
    borderRadius: 20,
    backgroundColor: 'whitesmoke',
    marginBottom: 8,
  },
  cartWrapper: {
    width: '100%',
    height: '100%',
  },
  bottomSeparator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,.7)',
    marginBottom: 20,
  },
  topDetails: {
    height: 100,
    width: '100%',
    paddingLeft: 25,
    flexDirection: 'row',
    //backgroundColor: 'green',
  },
  NameyStyleWrapper: {
    //backgroundColor: 'blue',
    width: '70%',
    height: 55,
    marginTop: 25,
    overflow: 'hidden',
  },
  beerName: {
    color: 'whitesmoke',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: 1,
  },
  styleName: {
    color: 'rgba(245, 245,245,.6 )',
    fontSize: 14,
    fontWeight: '500',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backBtnText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
    marginTop: -15,
  },

  bottomDetails: {
    flex: 1,
    paddingTop: 25,
    width: config.width,
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,.7)',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  separatorText: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    backgroundColor: '#282c34',
    top: -10,
    color: 'white',
    letterSpacing: 1,
    left: config.width * 0.5 - 50, //(windowWidth * containerWidth) 50% - 50% de separatorText
  },
  beerImage: {
    width: '100%',
    height: '30%',
  },







  viewAnimated: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});
/* @flow weak */

// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
//
// const Detail = ({}) => (
//   <View style={styles.container}>
//     <Text>I'm Detail</Text>
//   </View>
// );
//
// export default Detail;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
