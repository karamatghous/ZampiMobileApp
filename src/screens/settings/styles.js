import { StyleSheet, Platform } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    height: "100%",
  },

  bodyStyle: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.white
  },

  row: { width: "100%", flexDirection: "row", alignItems: 'center' },

  header: {
    color: 'black',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20
  },

  title: {
    width: "90%",
    color: colors.black,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 50,
    fontSize: 12,
    textAlign: "left",
  },

  dividerStyle: {
    height: 0.5,
    backgroundColor: colors.greyLighter,
    marginLeft: 20,
    marginRight: 20
  }

});

export default styles;
