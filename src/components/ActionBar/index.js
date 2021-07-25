import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { colors, fontSizes } from '../../styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar } from 'react-native-elements';
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomText from '../CustomText';

const HeaderTitle = ({
  backgroundStyle,
  navigation,
  title,
  onTitlePressed,
  rightFeatherIcon,
  iconStyle,
  rightIcon,
  rightText,
  rightAvatar,
  onRightIconPressed,
  doubleRightIcon,
  onRight1Icon,
  onRight2Icon,
  style,
  onBackPressed,
  showRightName,
  hideBackButton,
  onHelpPressed,
  showHelpIcon,
  rightMaterialCommunityIcon
}) => (
  <View style={[style, { width: '100%', backgroundColor: backgroundStyle ? backgroundStyle : style && style.backgroundColor ? style.backgroundColor : 'white', marginBottom: title || showRightName ? 20 : 0 }]}>
    <View style={[{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: backgroundStyle ? backgroundStyle : style && style.backgroundColor ? style.backgroundColor : 'white' }]}>
      {!hideBackButton ?
        < TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', padding: rightText || rightIcon || rightFeatherIcon || rightAvatar || doubleRightIcon ? 0 : 10, paddingLeft: backgroundStyle ? 0 : 16 }}
          onPress={() => {
            if (onBackPressed)
              onBackPressed();
            else
              navigation.goBack();
          }}>
          <Ionicons
            name={"arrow-back"}
            size={28}
          />
          <CustomText
            style={{ color: backgroundStyle ? 'white' : 'black', fontSize: fontSizes.small }}
            displayText='Back'
          />
        </TouchableOpacity>
        : null
      }

      <View style={{ marginLeft: hideBackButton ? '90%' : 0 }}>
        {rightText || rightIcon || rightFeatherIcon || rightAvatar || rightMaterialCommunityIcon ?
          <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center', padding: 10 }}
            onPress={onRightIconPressed}>
            {rightText ?
              <CustomText
                style={{ fontSize: 18, paddingRight: 16 }}
                displayText={rightText}
              />
              : rightIcon ?
                <Ionicons
                  style={[iconStyle]}
                  name={rightIcon}
                  size={28}
                />
                : rightFeatherIcon ?
                  <Feather
                    style={[iconStyle]}
                    name={"trash-2"}
                    size={28}
                  />
                  : rightMaterialCommunityIcon ?
                    <MaterialCommunityIcons
                      style={[iconStyle]}
                      name={rightMaterialCommunityIcon}
                      size={28}
                    />
                    : <Avatar
                      rounded
                      source={{ uri: rightAvatar }}
                      size={28}
                    />
            }
          </TouchableOpacity>
          : null
        }
        {doubleRightIcon ?
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <TouchableOpacity activeOpacity={1} style={{ width: '50%', alignItems: 'center' }}
              onPress={onRight1Icon}>
              <Ionicons
                name={doubleRightIcon[0]}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{ width: '50%', alignItems: 'center' }}
              onPress={onRight2Icon}>
              <Ionicons
                name={doubleRightIcon[1]}
                size={28}
              />
            </TouchableOpacity>
          </View>
          : null
        }
      </View>
    </View>

    {
      title || showRightName ?
        <TouchableOpacity activeOpacity={1} style={{ marginLeft: backgroundStyle ? 0 : 16, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }} onPress={onTitlePressed}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomText
              header
              style={{ color: backgroundStyle ? 'white' : 'black', textTransform: "uppercase", fontWeight: 'bold' }}
              displayText={title}
            />
            {showHelpIcon &&
              <Ionicons
                onPress={onHelpPressed}
                style={{ paddingHorizontal: 10, marginTop: 1 }}
                name='ios-help-circle-outline'
                size={18}
              />
            }
          </View>
          {showRightName ?
            <View style={{ backgroundColor: '#FF0000', borderRadius: 11, width: 22, height: 22, alignItems: 'center', justifyContent: 'center', marginRight: 24 }}>
              <CustomText
                style={{ color: colors.white, fontWeight: 'bold', fontSize: 12 }}
                displayText={showRightName}
              />
            </View>
            :
            null
          }
        </TouchableOpacity>
        : null
    }
  </View >
);

export default HeaderTitle;
