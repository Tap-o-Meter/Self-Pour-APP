import {socket} from '../redux/store';
import actions from '../redux/actions';
import globalStyles from '../../assets/styles';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {DeviceFeed, MainHeader, Gradient} from '../components';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  BackHandler,
} from 'react-native';

const Main = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.userReducer);
  const {fullInfoLines} = useSelector(state => state.beerReducer);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);

  const handleVisible = value => {
    setVisible(value);
  };

  const handleBackPress = () => {
    dispatch(actions.logOut());
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>MENÚ DE CERVEZAS</Text>

        {/* {user && !user.type ? (
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => navigation.navigate('Staff')}>
            <Icon name="cog" size={40} color={globalStyles.colors.black} />
          </TouchableOpacity>
        ) : null} */}
      </View>

      <SafeAreaView style={styles.listContainer}>
        <DeviceFeed
          lines={fullInfoLines}
          header={
            <MainHeader
              handleVisible={() => handleVisible(true)}
              visible={visible}
              rooms={[]}
            />
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  mainContainer: {
    ...globalStyles.mainContainer,
    alignItems: 'center',
  },
  header: {
    ...globalStyles.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleHeader: {
    ...globalStyles.texts.header1,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
