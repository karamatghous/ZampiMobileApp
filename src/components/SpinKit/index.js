import React from "react";
import Spinkit from 'react-native-spinkit'
import { colors } from '../../styles'
import Spinner from 'react-native-loading-spinner-overlay';

const SpinKitElement = ({ loader }) => {
  var spinKit = <Spinkit size={50}
    visible={loader.isLoading}
    style={{ justifyContent: "center" }}
    color={colors.white}
    type={"ThreeBounce"} />

  return (
    <Spinner
      visible={loader.isLoading}
      textContent={loader.message}
      animation="fade"
      customIndicator={spinKit}
      overlayColor='rgba(0,0,0,0.5)'
      textStyle={{ color: colors.white, width: "100%", justifyContent: "center", textAlign: "center" }}
    />
  );
};

export default SpinKitElement;
