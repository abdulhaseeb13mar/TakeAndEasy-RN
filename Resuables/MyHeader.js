/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from './frequentColors';
import {Measurements} from './Measurement';
import {Badge} from 'react-native-elements';
import {connect} from 'react-redux';

//======PROPS========
// leftIcon
// rightIcon
// leftIconAction
// leftIconName
// Title
// rightIconAction
// rightIconName
// titleStyle
// leftIconColor
// rightIconColor

function MyHeader({
  leftIcon,
  rightIcon,
  leftIconName,
  leftIconAction,
  leftIconColor,
  totalItems,
  titleStyle,
  Title,
  rightIconAction,
  rightIconName,
  rightIconColor,
}) {
  const LeftIconLibrary = leftIcon;
  const RightIconLibrary = rightIcon;
  return (
    <View style={styles.HeaderBarWrapper}>
      <View style={styles.HeaderBarInnerWrapper}>
        {LeftIconLibrary ? (
          <TouchableOpacity onPress={leftIconAction} style={styles.IconWrap}>
            <LeftIconLibrary
              name={leftIconName}
              size={Measurements.width * 0.065}
              color={leftIconColor ? leftIconColor : colors.primary}
            />
            {totalItems > 0 && leftIconName.includes('shopping') && (
              <Badge
                value={totalItems}
                containerStyle={styles.badgeContainer}
                badgeStyle={{backgroundColor: colors.primary}}
              />
            )}
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...styles.IconWrap,
              elevation: 0,
              backgroundColor: 'transparent',
            }}
          />
        )}
        <Text style={{...styles.HeaderText, ...titleStyle}}>{Title}</Text>
        {RightIconLibrary ? (
          <TouchableOpacity onPress={rightIconAction} style={styles.IconWrap}>
            <RightIconLibrary
              name={rightIconName}
              size={Measurements.width * 0.075}
              color={rightIconColor ? rightIconColor : colors.primary}
            />
            {totalItems > 0 && rightIconName.includes('shopping') && (
              <Badge
                value={totalItems}
                containerStyle={styles.badgeContainer}
                badgeStyle={{backgroundColor: colors.primary}}
              />
            )}
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...styles.IconWrap,
              elevation: 0,
              backgroundColor: 'transparent',
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  IconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    // backgroundColor: ,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
  },
  HeaderText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: Measurements.width * 0.08,
  },
  HeaderBarInnerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Measurements.width * 0.93,
  },
  HeaderBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Measurements.height * 0.018,
  },
});

const mapStateToProps = (state) => ({
  totalItems: state.ReducerCart.totalItems,
});

export default connect(mapStateToProps, {})(MyHeader);
