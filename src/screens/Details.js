import {socket} from '../redux/store';
import actions from '../redux/actions';
import config from '../config';
import {useSelector} from 'react-redux';
import globalStyles from '../../assets/styles';
import Icon from 'react-native-vector-icons/Feather';
import React, {useState, useEffect, useRef} from 'react';
import {Loader} from '../components';
import PouringModal from '../components/Modals/PouringModal';
import OutlinedButton from '../components/Buttons/OutlinedButton';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';

const Details = ({route, navigation}) => {
  const {item} = route.params;
  const {user} = useSelector(state => state.userReducer);
  const concepts = [...config.concepts];
  const {ozToMl} = config;

  // if (user && !user.type) concepts.push({name: 'Merma', qty: 20});

  const loaderRef = useRef();
  const pouringModalRef = useRef();
  const [selectedConcept, setSelectedConcept] = useState(concepts[0]);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true; // Esto previene que el evento se propague más.

    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleVisible = value => {
    const concept = concepts[value];
    const ml_qty = ozToMl(concept.qty);

    setSelectedConcept(concept);

    const msg = {
      lineId: item._id,
      userId: user._id,
      requestedVolume: ml_qty,
      concept: concept.concept,
    };

    loaderRef.current.setLoading(true);
    setResponseListeners(true);
    socket.emit('client_request_pour', msg);
  };

  const setResponseListeners = set => {
    if (set) {
      socket.on('confirm_order', orderConfirm);
      socket.on('line_not_available', orderRejected);
    } else {
      socket.off('confirm_order');
      socket.off('line_not_available');
    }
  };

  const orderConfirm = msg => {
    console.log(msg);
    if (user._id == msg.user) {
      setResponseListeners(false);

      loaderRef.current.setLoading(false);
      pouringModalRef.current.setVisible(true);
    }
  };

  const orderRejected = msg => {
    console.log(msg);
    if (item._id == msg.id) {
      setResponseListeners(false);

      loaderRef.current.setError('Linea no disponible');
    }
  };

  const isConceptAvailable = name => {
    if (!user) return;
    if (!user.type) return true;

    const qty_available = user.beers[name.toLowerCase()];
    return qty_available > 0;
  };

  const getQtys = () => {
    return concepts.map((concept, index) => {
      return (
        <OutlinedButton
          key={index}
          eneable={isConceptAvailable(concept.concept)}
          style={styles.qtyButton}
          caption={concept.name}
          onPress={() => handleVisible(index)}
        />
      );
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={35}
            color={globalStyles.colors.lightBlack}
          />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Detalles</Text>
      </View>

      <ScrollView style={{backgroundColor: 'transparent'}}>
        <SafeAreaView style={styles.listContainer}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.productImage}
              resizeMode="cover"
              source={{uri: item.beer.cloudImage}}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.beer.name}</Text>
              <Text style={styles.productStyle}>{item.beer.style}</Text>
              <Text style={styles.productStyle}>
                <Text style={styles.productDetails}>IBU:</Text>
                {' ' + item.beer.ibu + ' '} -
                <Text style={styles.productDetails}> ABV:</Text>
                {' ' + item.beer.abv}
              </Text>
              {item.beer.description && item.beer.description.length > 0 ? (
                <Text style={[styles.productStyle, {marginTop: 10}]}>
                  {item.beer.description}
                </Text>
              ) : (
                <Text style={[styles.noDescription, {marginTop: 10}]}>
                  Sin descripción
                </Text>
              )}
            </View>
          </View>
          <Text style={styles.chooseQtyHeader}>Elegir cantidad</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={styles.qtys}>
            {getQtys()}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
      <PouringModal
        lineId={item._id}
        concept={selectedConcept}
        ref={pouringModalRef}
      />
      <Loader ref={loaderRef} animationType={'fade'} />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  mainContainer: {
    ...globalStyles.mainContainer,
    alignItems: 'center',
  },
  header: {
    ...globalStyles.header,
    flexDirection: 'row',
  },
  titleHeader: {
    ...globalStyles.texts.header1,
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  listContainer: {
    width: '100%',
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  cardContainer: {
    width: '100%',
    // height: '80%',
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 360,
    // backgroundColor: 'red',
  },
  productInfo: {
    width: '100%',
    // height: '15%',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  productName: {
    ...globalStyles.texts.header2,
  },
  productStyle: {
    ...globalStyles.texts.body,
  },
  noDescription: {
    ...globalStyles.texts.header1,
    color: globalStyles.colors.gray,
    paddingTop: 30,
    textAlign: 'center',
    paddingBottom: 30,
  },
  chooseQtyHeader: {
    ...globalStyles.texts.header2,
    marginTop: 20,
    marginBottom: 10,
  },
  qtys: {
    marginTop: 10,
    marginBottom: 20,
    // flexDirection: 'row',
  },
  qtyButton: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 15,
  },
  productDetails: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
