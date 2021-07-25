import { moderateScale } from './scalingUtils';

const fontSizes = {
  xbig: moderateScale(34),
  big: moderateScale(22),
  xxmedium: moderateScale(20),
  xmedium: moderateScale(16),
  medium: moderateScale(14),
  small: moderateScale(12),
  verySmall: moderateScale(10),
  header: moderateScale(18),
  subHeader: moderateScale(16),
  title: moderateScale(14),
  subtitle: moderateScale(12),
  description: moderateScale(10),
  desc: moderateScale(8)
};

export default fontSizes;
