import * as React from 'react';
import config from '../../config';
import {useSelector} from 'react-redux';
import globalStyles from '../../../assets/styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function UserBottomTab({navigation}) {
  const {user} = useSelector(state => state.userReducer);

  const name = user ? user.nombre + ' ' + user.apellidos : 'Usuario';
  const backgroundColor =
    user && !user.type
      ? globalStyles.colors.black
      : globalStyles.colors.lightGreen;

  const getAvailable = () => {
    // const {concepts} = config;
    // const user_available = user.beers;
    // return user_available.map(concept => (
    // ))
  };

  return (
    <View style={[styles.userTabContainer, {backgroundColor}]}>
      <View style={styles.topSection}>
        <Text style={styles.userNamePrompt}>Usuario:</Text>
        <View style={styles.availablePromt}>
          {user && !user.type ? null : (
            <Text style={[styles.qtyPromt, {flex: 1}]}>Disponible</Text>
          )}

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.topSection,
          {marginTop: 0, marginRight: 5, alignItems: 'flex-start'},
        ]}>
        <Text style={styles.userName}> {name}</Text>
        <View>
          {user && !user.type ? (
            <Text style={styles.qtyAvalable}>STAFF</Text>
          ) : null}

          {user && user.beers ? (
           <>
           <View style={styles.availableConcepts}>
             <View style={styles.conceptWrapper}>
               <Text style={styles.qtyAvalable}>{user.beers.pint}</Text>
               <Text style={styles.qtyPromt}>Cervezas</Text>
             </View>
             <View style={styles.conceptWrapper}>
               <Text style={styles.qtyAvalable}>{user.beers.taster}</Text>
               <Text style={styles.qtyPromt}>Taster</Text>
             </View>
             <View style={styles.conceptWrapper}>
               <Text style={styles.qtyAvalable}>{user.beers.flight}</Text>
               <Text style={styles.qtyPromt}>Pruebas</Text>
             </View>
           </View>
         </>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userTabContainer: {
    height: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 15,
    paddingRight: 8,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  availablePromt: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 130,
    justifyContent: 'flex-end',
    textAlign: 'left',
  },
  userNamePrompt: {
    ...globalStyles.texts.header5,
    color: globalStyles.colors.lightGray,
    fontWeight: '800',
  },
  userName: {
    ...globalStyles.texts.header2,
    color: globalStyles.colors.lightGray,
    fontWeight: '400',
  },
  availableConcepts: {
    flexDirection: 'row',
  },
  conceptWrapper: {
    marginLeft: 10,
    alignItems: 'center',
  },
  qtyAvalable: {
    ...globalStyles.texts.header1,
    color: globalStyles.colors.lightGray,
    fontWeight: '400',
    textAlign: 'right',
  },
  qtyPromt: {
    color: globalStyles.colors.lightGray,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'left',
  },
});
export default UserBottomTab;
