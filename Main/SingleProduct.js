/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Measurements} from '../Resuables/Measurement';
import WrapperScreen from '../Resuables/WrapperScreen';
import UseHeader from '../Resuables/MyHeader';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Resuables/frequentColors';
import NavigationRef from '../Resuables/RefNavigation';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  setFavAction,
  removeFavAction,
  plusCart,
  minusCart,
} from '../reduxStore/actions';

function SingleProduct(props) {
  const product = props.product;

  const MyRemoveFromCart = () => {
    props.myCart[product.id].added !== 0 && props.minusCart(product);
  };

  const MyAddToCart = () => props.plusCart(product);
  const MyGotoCart = () => NavigationRef.NavigateAndReset('MyCart');
  const MyGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Ionicons}
        leftIconName="chevron-back"
        leftIconAction={MyGoBack}
        rightIconAction={MyGotoCart}
        rightIcon={Feather}
        rightIconName="shopping-bag"
        Title=""
      />
      <View style={styles.singleProduct_TE1}>
        <View style={styles.singleProduct_TE2}>
          <ImageBackground
            source={product.images}
            style={styles.singleProduct_TE3}
            resizeMode="contain"
          />
          <View style={styles.singleProduct_TE4}>
            <Text style={styles.singleProduct_TE5}>${product.price}</Text>
            <View style={styles.singleProduct_TE6}>
              <Text style={styles.singleProduct_TE7}>{product.cal}</Text>
              <Text style={styles.singleProduct_TE8}>Calories</Text>
            </View>
          </View>
          <Text style={styles.singleProduct_TE9}>{product.productName}</Text>
          <Text style={styles.singleProduct_TE10}>{product.discription}</Text>
        </View>
        <View style={styles.singleProduct_TE11}>
          <AntDesign
            color="white"
            name="heart"
            size={Measurements.width * 0.08}
          />
        </View>
      </View>
      <View
        style={{
          ...styles.singleProduct_TE12,
          ...(props.myCart[product.id] !== undefined &&
          props.myCart[product.id] !== 0
            ? {}
            : {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }),
        }}>
        {props.myCart[product.id] !== undefined &&
        props.myCart[product.id].added !== 0 ? (
          <View style={styles.singleProduct_TE13}>
            <TouchableOpacity onPress={MyAddToCart}>
              <AntDesign
                name="plus"
                color="white"
                size={Measurements.height * 0.04}
              />
            </TouchableOpacity>
            <Text style={styles.singleProduct_TE14}>
              {props.myCart[product.id].added}
            </Text>
            <TouchableOpacity onPress={MyRemoveFromCart}>
              <AntDesign
                name="minus"
                color="white"
                size={Measurements.height * 0.04}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={MyAddToCart}
            style={styles.singleProduct_TE15}>
            <Text style={styles.singleProduct_TE16}>ADD TO CART</Text>
          </TouchableOpacity>
        )}
      </View>
    </WrapperScreen>
  );
}

const styles = StyleSheet.create({
  singleProduct_TE16: {
    color: 'white',
    height: Measurements.width * 0.22,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.048,
    textAlignVertical: 'center',
  },
  singleProduct_TE15: {
    alignSelf: 'stretch',
    width: Measurements.height * 0.24,
    transform: [{rotate: '270deg'}],
  },
  singleProduct_TE14: {
    fontSize: Measurements.width * 0.08,
    color: 'white',
    fontWeight: 'bold',
  },
  singleProduct_TE13: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  singleProduct_TE12: {
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: Measurements.height * 0.24,
    width: Measurements.width * 0.22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderTopLeftRadius: 30,
    elevation: 3,
  },
  singleProduct_TE11: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
    elevation: 2,
    width: Measurements.width * 0.25,
    alignSelf: 'flex-start',
    paddingVertical: Measurements.height * 0.012,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: Measurements.width * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  singleProduct_TE10: {
    lineHeight: Measurements.width * 0.055,
    fontWeight: 'bold',
    color: colors.lightGrey1,
    width: Measurements.width * 0.75,
  },
  singleProduct_TE9: {
    color: 'black',
    fontSize: Measurements.width * 0.065,
    marginVertical: Measurements.height * 0.02,
    fontWeight: 'bold',
    width: Measurements.width * 0.8,
  },
  singleProduct_TE8: {
    fontWeight: 'bold',
    color: colors.lightGrey3,
    textAlign: 'center',
  },
  singleProduct_TE7: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: Measurements.width * 0.044,
  },
  singleProduct_TE6: {
    alignSelf: 'stretch',
    paddingHorizontal: Measurements.width * 0.02,
    borderRadius: 10,
    borderColor: colors.lightBackground,
    borderWidth: 1,
    elevation: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  singleProduct_TE5: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: Measurements.width * 0.044,
    alignSelf: 'stretch',
    textAlignVertical: 'center',
    paddingHorizontal: Measurements.width * 0.02,
    borderRadius: 10,
    borderColor: colors.lightBackground,
    borderWidth: 1,
    elevation: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  singleProduct_TE4: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  singleProduct_TE3: {
    width: '100%',
    height: Measurements.height * 0.4,
  },
  singleProduct_TE2: {
    width: '100%',
    paddingHorizontal: Measurements.width * 0.02,
  },
  singleProduct_TE1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const mapStateToProps = (state) => {
  return {
    product: state.crntPrdtReducer,
    favs: state.favouritesReducer,
    myCart: state.ReducerCart.items,
  };
};

export default connect(mapStateToProps, {
  setFavAction,
  removeFavAction,
  minusCart,
  plusCart,
})(React.memo(SingleProduct));
