/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../Resuables/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import {Button, Overlay} from 'react-native-elements';
import UseHeader from '../Resuables/MyHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {isFormValid} from '../Resuables/validation';
import NavigationRef from '../Resuables/RefNavigation';
import {UserAction, refreshCart} from '../reduxStore/actions';
import Toast from 'react-native-root-toast';

const ConfirmOrder = (props) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErrMsg, setLastNameErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [address, setAddress] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const ConfirmTakenEasy = () => {
    const formValidResponse = isFormValid(
      firstName,
      lastName,
      email,
      phone,
      address,
    );
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      UserAction({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      backgroundColor: colors.secondary,
      textColor: 'white',
      opacity: 1,
      position: -60,
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            phonenumber: phone,
            address: address,
            email: email,
            appname: 'Take And Easy',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setFirstNameErrMsg(errMsg);
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'lastname') {
      setLastNameErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    props.refreshCart();
    NavigationRef.Push('Home');
  };

  const changeFirstName = (t) => setFirstName(t);
  const changeLastName = (t) => setLastName(t);
  const changeEmail = (t) => setEmail(t);
  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const goBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: colors.primary}}>
      <UseHeader
        leftIcon={Ionicons}
        leftIconName="chevron-back"
        leftIconAction={goBack}
        Title="Contact Information"
        titleStyle={{fontSize: Measurements.width * 0.06, color: 'white'}}
        leftIconColor="white"
      />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.summaryOverlay}>
          <View style={styles.sm1}>
            <View style={styles.sm2}>
              <Text>Total:</Text>
              <Text style={{fontWeight: 'bold'}}>${props.total}</Text>
            </View>
            <View style={styles.sm3}>
              <Text style={styles.sm4}>Payment Mode:</Text>
              <Text style={styles.sm4}>Payment on delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.PersonalInfoWrapper}>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: firstNameErrMsg ? 'white' : colors.primary,
                backgroundColor: firstNameErrMsg ? 'red' : colors.primary,
              }}>
              FIRST NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="user"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="First Name"
                style={styles.Input}
                onChangeText={changeFirstName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: lastNameErrMsg ? 'white' : colors.primary,
                backgroundColor: lastNameErrMsg ? 'red' : colors.primary,
              }}>
              LAST NAME <Text> {lastNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="user"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.Input}
                onChangeText={changeLastName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: emailErrMsg ? 'white' : colors.primary,
                backgroundColor: emailErrMsg ? 'red' : colors.primary,
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="mail"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.Input}
                onChangeText={changeEmail}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: phoneErrMsg ? 'white' : colors.primary,
                backgroundColor: phoneErrMsg ? 'red' : colors.primary,
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="phone"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={styles.Input}
                onChangeText={changePhone}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: addressErrMsg ? 'white' : colors.primary,
                backgroundColor: addressErrMsg ? 'red' : colors.primary,
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="map-pin"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Address"
                style={styles.Input}
                onChangeText={changeAddress}
              />
            </View>
          </View>
        </View>
        <View style={styles.ConfirmButtonWrapper}>
          <Button
            title="CONFIRM ORDER"
            raised
            buttonStyle={styles.confirmButton}
            titleStyle={{color: colors.primary, fontWeight: 'bold'}}
            containerStyle={styles.confirmButtonContainer}
            onPress={ConfirmTakenEasy}
            loading={loading}
            loadingProps={{color: colors.primary}}
          />
        </View>
        <Overlay
          isVisible={showModal}
          onBackdropPress={closeModal}
          animationType="fade">
          <View style={styles.ModalWrapper}>
            <Entypo
              name="check"
              size={Measurements.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.ModalHeadText}>TAKE AND EASY</Text>
            <Text style={styles.ModalSubText}>
              We have recieved your order!
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.ReducerCart.totalAmount,
  };
};

export default connect(mapStateToProps, {UserAction, refreshCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  sm4: {fontSize: Measurements.width * 0.03, fontWeight: 'bold'},
  sm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sm1: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: Measurements.width * 0.04,
  },
  summaryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Measurements.height * 0.02,
  },
  ModalSubText: {
    fontSize: Measurements.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalHeadText: {
    fontSize: Measurements.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalWrapper: {
    paddingVertical: Measurements.height * 0.04,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Measurements.width * 0.8,
  },
  confirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: 'white',
    padding: Measurements.height * 0.018,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Measurements.width * 0.035,
    marginBottom: Measurements.height * 0.02,
  },
  Input: {
    width: Measurements.width * 0.81,
    height: Measurements.height * 0.065,
  },
  inputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Measurements.width * 0.09,
    color: colors.primary,
  },
  personalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: Measurements.width * 0.02,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGrey2,
  },
  personalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
  },
  singlePersonalInfoWrapper: {
    marginVertical: 10,
  },
  PersonalInfoWrapper: {
    marginHorizontal: Measurements.width * 0.035,
  },
  container: {flex: 1},
});
