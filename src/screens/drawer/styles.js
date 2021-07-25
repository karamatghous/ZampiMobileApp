import { StyleSheet, Platform } from "react-native";
import { dimensions, colors, fontSizes, fontWeights } from "../../styles";

const { verticalIndent, paddingIndent } = dimensions;

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.groupbg
  },
  bodyStyle: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.white
  },
  row: { width: "100%", flexDirection: "row", alignItems: 'center' },
  headerView: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center'
  },
  headerText: {
    width: "95%",
    color: colors.white,
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.medium
  },
  headerContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    backgroundColor: colors.primary
  },
  title: {
    width: "90%",
    color: colors.black,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    fontSize: fontSizes.medium,
    textAlign: "left",
    fontWeight: fontWeights.normal
  },
  detailsRowContainer: {
    width: "100%",
    marginTop: verticalIndent - 8,
    marginBottom: verticalIndent - 8,
    flexDirection: "row",
    flex: 1
  },

  detailsTextLeft: {
    color: colors.secondaryText,
    fontSize: fontSizes.medium,
    backgroundColor: colors.transparent,
    fontWeight: fontWeights.normal,
    paddingLeft: 16,
    alignSelf: "center",
    alignItems: "flex-start",
    alignContent: "center",
    textAlign: "left",
    justifyContent: "center",
    width: "40%"
  },
  detailsTextRight: {
    color: colors.black,
    fontSize: fontSizes.medium,
    borderWidth: 0,
    fontWeight: fontWeights.medium,
    alignItems: "flex-end",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "right",
    width: "60%"
  },
  inputStyle: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: colors.white
  },

  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "center",
    marginTop: 1
  },
  actionIconRight: {
    color: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS == 'android' ? 16 : 4,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 24
    //  width: "30%"
  },
  selectTextStyle: {
    fontSize: fontSizes.medium
  },
  rootTopContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    padding: verticalIndent / 2,
    marginRight: paddingIndent,
    marginBottom: 1
  },

  childContainer: {
    width: "20%",
    alignItems: "flex-end",
    alignContent: "flex-end",
    alignSelf: "flex-end",
    marginRight: paddingIndent * 2
  },

  rootContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white
  },

  label: {
    width: "80%",
    paddingLeft: verticalIndent / 4,
    paddingTop: verticalIndent / 2,
    fontSize: fontSizes.medium,
    color: colors.greyDarker,
    alignItems: "flex-start",
    alignContent: "flex-start",
    alignSelf: "flex-start"
  },

  navigationLabel: {
    paddingTop: verticalIndent / 2,
    alignItems: "flex-end",
    fontSize: fontSizes.verySmall - 1,
    color: colors.blue
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: verticalIndent,
    paddingLeft: verticalIndent / 2,
    paddingRight: verticalIndent / 2,
    paddingTop: verticalIndent / 8,
    paddingBottom: verticalIndent / 2,
    flex: 1
  },

  inputRootView: { width: "100%", marginBottom: 1 },

  dividerStyle: {
    height: 0.5,
    backgroundColor: colors.greyLighter,
    marginLeft: 16,
    marginRight: 16
  },

  titleContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: colors.headerBg,
    marginBottom: verticalIndent
  },
  titleStyle: {
    width: "80%",
    padding: verticalIndent / 2,
    color: colors.white,
    fontSize: fontSizes.xmedium,
    fontWeight: fontWeights.thin
  },
  iconTitleLeft: {
    color: colors.white,
    alignItems: "center",
    marginLeft: 8,
    alignContent: "flex-start",
    alignSelf: "center"
  },
  iconTitleRight: {
    color: colors.white,
    alignItems: "center",
    alignContent: "flex-end",
    alignSelf: "center"
  },
  columnContainer: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    alignItems: "flex-start"
  },
  sectionStarter: {
    paddingTop: 2,
    color: colors.secondaryText,
    fontSize: fontSizes.medium,
    fontWeight: "normal",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    textAlign: "left",
    justifyContent: "flex-start",
    width: "40%"
    //flex: 0.6
  },
  sectionEnd: {
    color: colors.gray,
    fontSize: fontSizes.small,
    alignItems: "center",
    alignContent: "flex-end",
    alignSelf: "flex-end",
    textAlign: "right",
    paddingRight: 20,
    width: "35%"
    //flex: 0.2
  },
  dollarValue: {
    color: colors.green,
    fontWeight: fontWeights.extraBold,
    fontSize: fontSizes.medium
  },
  normalText: {
    paddingLeft: 8,
    color: colors.primaryText,
    fontSize: fontSizes.medium,
    textTransform: "capitalize"
  },
  sectionDescEnd: {
    paddingTop: 4,
    width: "60%",
    color: colors.primaryText,
    alignItems: "baseline",
    fontSize: fontSizes.medium,
    alignContent: "flex-end",
    alignSelf: "baseline",
    textAlign: "right",
    flex: 1
  },
  headerStarter: {
    alignSelf: "center",
    justifyContent: "flex-start",
    textAlign: "left",
    alignContent: "flex-start",
    alignItems: "flex-start"
  },

  sectionBottom: {
    paddingTop: 16,
    alignItems: "center"
  }
});

export default styles;
