/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import WrapperScreen from '../Resuables/WrapperScreen';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationRef from '../Resuables/RefNavigation';
import {
  setCurrentProductAction,
  setFavAction,
  removeFavAction,
} from '../reduxStore/actions';

function Booking(props) {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);
  const product = props.product;

  const checkIfFav = () => {
    for (let i = 0; i < props.favs.length; i++) {
      if (props.favs[i].id === product.id) {
        setFav(true);
        break;
      }
    }
  };

  const proceedToBookings = () => {
    props.setCurrentProductAction({...product});
    NavigationRef.Navigate('PersonalInfo');
  };

  const toggleFav = () => {
    fav ? props.removeFavAction(product.id) : props.setFavAction(product);
    setFav(!fav);
  };
  const goBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: colors.lightBackground2}}>
      <View style={styles.pt_imgBackWrapper}>
        <TouchableOpacity style={styles.crossWrapper} onPress={goBack}>
          <AntDesign
            name="arrowleft"
            color="black"
            size={Measurements.width * 0.07}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.hearWrapper} onPress={toggleFav}>
          <Entypo
            name={fav ? 'heart' : 'heart-outlined'}
            size={Measurements.width * 0.07}
            color={colors.primary}
          />
        </TouchableOpacity>
        <ImageBackground
          source={product.images}
          style={styles.pt_imageBackground}
          imageStyle={{width: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.PD_1}>
        <View style={styles.detailWrapper}>
          <View style={styles.PD_2}>
            <View style={styles.PD_3}>
              <Text style={styles.PD_4}>{product.productName}</Text>
              <Text style={styles.PD_5}>${product.price}</Text>
            </View>
            <Text style={styles.PD_6}>{product.address}</Text>
          </View>
          <Text style={styles.PD_11}>{product.dis}</Text>
          <View style={styles.PD_12}>
            <Button
              raised
              title="PURCHASE NOW"
              buttonStyle={styles.confirmButton}
              containerStyle={{width: '100%'}}
              titleStyle={styles.buttonText}
              onPress={proceedToBookings}
            />
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.currentProductReducer,
    favs: state.favouritesReducer,
  };
};

export default connect(mapStateToProps, {
  setCurrentProductAction,
  setFavAction,
  removeFavAction,
})(React.memo(Booking));

const styles = StyleSheet.create({
  PD_12: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PD_11: {
    width: '90%',
    fontSize: Measurements.width * 0.04,
    lineHeight: Measurements.height * 0.035,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: colors.primary,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: colors.secondary,
    paddingHorizontal: Measurements.width * 0.02,
    paddingVertical: Measurements.height * 0.007,
  },
  PD_10: {},
  PD_9: {},
  PD_8: {},
  PD_7: {},
  PD_6: {
    marginTop: Measurements.height * 0.01,
    color: colors.primary,
    fontSize: Measurements.width * 0.038,
    fontWeight: 'bold',
    opacity: 0.6,
  },
  PD_5: {
    fontSize: Measurements.width * 0.055,
    fontWeight: 'bold',
    color: colors.primary,
  },
  PD_4: {
    fontSize: Measurements.width * 0.055,
    fontWeight: 'bold',
    color: colors.primary,
    width: '65%',
  },
  PD_3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  PD_2: {
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 12,
    padding: Measurements.width * 0.047,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: -Measurements.height * 0.04,
  },
  PD_1: {
    position: 'relative',
    height: '50%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonText: {fontWeight: 'bold', color: colors.secondary},
  confirmButton: {
    paddingVertical: Measurements.height * 0.017,
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  crossWrapper: {
    position: 'absolute',
    padding: Measurements.width * 0.002,
    backgroundColor: 'white',
    borderRadius: 7,
    top: Measurements.height * 0.023,
    left: Measurements.width * 0.05,
    zIndex: 5,
  },
  hearWrapper: {
    position: 'absolute',
    padding: Measurements.width * 0.002,
    backgroundColor: 'white',
    borderRadius: 7,
    top: Measurements.height * 0.023,
    right: Measurements.width * 0.05,
    zIndex: 5,
  },
  detailWrapper: {
    height: '90%',
    paddingHorizontal: Measurements.width * 0.045,
    paddingBottom: Measurements.height * 0.02,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  pt_imgBackWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  pt_imageBackground: {
    width: '90%',
    height: Measurements.height * 0.46 - 22,
    marginTop: Measurements.height * 0.05,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});
