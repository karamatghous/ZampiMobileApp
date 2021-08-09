import React from 'react';
import { Text } from 'react-native';
import fontSizes from '../../styles/fontSizes';

const CustomText = ({
    style,
    displayText,
    onTextPressed,
    multiline,
    numberOfLines,
    header,
    subHeader,
    title,
    subtitle,
    description
}) => (
    multiline && style ?
        <Text
            style={[style, { fontSize: 100 ? style.fontSize : header ? fontSizes.header : subHeader ? fontSizes.subHeader : title ? fontSizes.title : subtitle ? fontSizes.subtitle : description ? fontSizes.description : fontSizes.subtitle }]}
            onPress={onTextPressed}
        >
            {displayText}
        </Text>
        : !style && multiline ?
            <Text
                style={{ fontSize: header ? fontSizes.header : subHeader ? fontSizes.subHeader : title ? fontSizes.title : subtitle ? fontSizes.subtitle : description ? fontSizes.description : fontSizes.subtitle }}
                onPress={onTextPressed}
            >
                {displayText}
            </Text>
            : !style ?
                <Text
                    numberOfLines={numberOfLines ? numberOfLines : 1}
                    ellipsizeMode={"tail"}
                    style={{ fontSize: header ? fontSizes.header : subHeader ? fontSizes.subHeader : title ? fontSizes.title : subtitle ? fontSizes.subtitle : description ? fontSizes.description : fontSizes.subtitle }}
                    onPress={onTextPressed}
                >
                    {displayText}
                </Text>
                :
                <Text
                    numberOfLines={numberOfLines ? numberOfLines : 1}
                    ellipsizeMode={"tail"}
                    style={[style, { fontSize: style.fontSize ? style.fontSize : header ? fontSizes.header : subHeader ? fontSizes.subHeader : title ? fontSizes.title : subtitle ? fontSizes.subtitle : description ? fontSizes.description : fontSizes.subtitle }]}
                    onPress={onTextPressed}
                >
                    {displayText}
                </Text>
);
export default CustomText