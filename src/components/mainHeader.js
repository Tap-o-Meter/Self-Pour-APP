import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import DropDownMenu from './DropDownMenu';
import config from '../config';
import React, {Component} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const MainHeader = (props) => {
  const navigation = useNavigation();
  // const noLinea = route.params.noLinea;
  const {lines, beers, kegs} = useSelector((state) => state.beerReducer);
  const options = [
    ...new Set(
      beers.map((beer) => ({
        name: beer.style,
      })),
    ),
  ];
  options.unshift({name: 'All Styles'});
  const {visible} = props;
  const getBeer = (noLinea) => {
    const line = lines.find((line) => line.noLinea === noLinea);
    const keg = kegs.find((keg) => keg._id === line.idKeg); //Encontrar de los barriles, un  barril y que ese barril tenga el mismo id que el barril de la linea
    const beer = beers.find((beer) => beer._id === keg.beerId);
    return beer;
  };
  const getRooms = () => {
    return props.rooms.map((room, index) => {
      const beer = getBeer(room._id);
      const image = beer.cloudImage
        ? {uri: beer.cloudImage}
        : config.images.logo;
      return (
        <TouchableOpacity key={index} style={styles.cards}>
          <Image style={styles.cardImage} source={image} />
          <Icon
            name={room.icon}
            size={55}
            color={config.colorApp}
            style={styles.cardIcon}
          />
          <Text numberOfLines={2} style={styles.cardText}>
            {beer.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <View>
      <View>
        <Text style={styles.roomsText}>COLA</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.roomsScroll}>
          {
            <TouchableOpacity onPress={() => {}} style={styles.newRoom}>
              <Text style={{fontSize: 50, color: 'white'}}>5</Text>
              <Text style={styles.newRoomText}>TURNOS </Text>
              <Text style={styles.newRoomText}>FALTANTES</Text>
            </TouchableOpacity>
          }
          {getRooms()}
        </ScrollView>
      </View>
      <View style={{height: 70, marginTop: 10, marginBottom: 15}}>
        <Text style={styles.roomsText}>LÍNEAS</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.header}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {/* <DropDownMenu
            menutext="Estilo: "
            categories={options}
            menustyle={styles.buttonHeader}
            textStyle={{color: 'white'}}
            option2Click={() => {}}
          /> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default MainHeader;
const styles = StyleSheet.create({
  roomsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    paddingLeft: 10,
    marginBottom: 10,
  },
  roomsScroll: {paddingHorizontal: 10, marginBottom: 5},
  newRoom: {
    alignItems: 'center',
    height: 110,
    width: 90,
    justifyContent: 'flex-end',
    borderWidth: 0,
    borderColor: 'white',
    borderRadius: 8,
    padding: 6,
  },
  newRoomText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '800',
    flexDirection: 'row',
  },
  cards: {
    height: 110,
    width: 90,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,.2)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cardImage: {
    height: 110,
    width: 90,
    position: 'absolute',
    opacity: 0.5,
  },
  cardIcon: {
    height: 60,
    width: 60,
    position: 'absolute',
    left: 10,
    top: 15,
  },
  cardText: {
    marginRight: 5,
    marginBottom: 5,
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
  },
  scrollView: {
    paddingTop: 7,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  buttonHeader: {
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 5,
    borderColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  buttonTextHeader: {color: 'white'},
});
