import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from "react";
import { 
  GestureResponderEvent, 
  StyleProp, 
  TextStyle, 
  Text,
  View, 
  ViewStyle,
  StyleSheet,
  TextInput,
  Pressable,
  TextInputProps
} from "react-native";
import CustomIcon, { IconsVariant } from "./CustomIcons/CustomIcon";
import Theme from "../assets/theme/theme.styles";
import { textStyles } from "../assets/theme/shared.styles";
import { EntypoIconsNames } from "./CustomIcons/IconNames";

export enum FormInputVariant {
  TEXT,
  BROWSE,
}

interface FromInputIconProps {
  name: string;
  variant: IconsVariant;
  color?: string;
  size?: number;
  shown?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

interface FormInputProps {
  value: string;
  label: string;
  placeholder?: string;
  infoMessage?: string;
  disabled?: boolean;
  isError?: boolean;
  variant?: FormInputVariant;
  rootStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  startIcon?: FromInputIconProps;
  endIcon?: FromInputIconProps;
  others?: TextInputProps;
  onChangeInput(value: string): void;
}

const FormInput = ({
  value,
  label,
  placeholder,
  infoMessage,
  disabled = false,
  isError = false,
  fullWidth = true,
  startIcon,
  endIcon,
  variant = FormInputVariant.TEXT,
  rootStyle = {},
  others,
  onChangeInput,
}: FormInputProps) => {

  const handlePickupFilePath = useCallback(() => {
    let filePath: string = '';
    onChangeInput(filePath);
  }, [])

  const renderIcon = useCallback((icon?: FromInputIconProps, isStart: boolean = true) => {
    if (!icon || !icon.shown) {
      return null;
    }

    return (
        <View style={[styles.iconWrapper, isStart ? styles.startIcon : styles.endIcon]}>
          {icon.onPress ? (
              <Pressable 
                onPress={icon.onPress}
                style={({pressed}) => [{
                  opacity: pressed ? 0.75 : 1,
                }]}
              >
                <CustomIcon variant={icon.variant} name={icon.name} size={icon.size} color={icon.color} />
              </Pressable>
            ) : (
              <CustomIcon variant={icon.variant} name={icon.name} size={icon.size} color={icon.color} />
            )
          }
        </View>
      );
  }, [])

  const renderTextInput = useCallback(() => {
    return (
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Theme.black}
        editable={!disabled}
        onChangeText={onChangeInput}
        style={[styles.input]}
        {...others}
      />
    )
  }, []);

  const renderPressInput = useCallback(() => {
    return (
      <Pressable
        onPress={handlePickupFilePath}
        style={({pressed}) => [
          styles.browseInput,
          {
            opacity: pressed ? 0.75 : 1,
          }
        ]}
      >
        <Text style={styles.browsePlaceholder}>
          {value || placeholder}
        </Text>
      </Pressable>
    )
  }, []);

  return (
    <View style={[styles.root, rootStyle, fullWidth ? styles.fullRoot : {}]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, isError ? styles.errorInput : styles.validInput]}>
        {renderIcon(startIcon)}
        {variant === FormInputVariant.TEXT ? renderTextInput() : renderPressInput()}
        {renderIcon(endIcon, false)}
      </View>
      {infoMessage && (
        <View style={styles.infoWrapper}>
          <CustomIcon 
            variant={IconsVariant.Entypo}
            name={EntypoIconsNames.info}
            color={Theme.grey}
            size={12}
          />
          <Text style={styles.infoMsg}>{infoMessage}</Text>
        </View>
      )}
    </View>
  )
} 

const styles = StyleSheet.create({
  root: {
    marginBottom: 14,
  },
  fullRoot: {
    width: '100%'
  },
  label: {
    ...textStyles.formLabel,
    marginBottom: 14,
    color: Theme.black,
  },
  inputWrapper: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Theme.lightGrey3,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    ...textStyles.formLabel,
    marginVertical: 16,
    borderWidth: 0,
    height: '100%',
    flex: 1,
    color: Theme.black,
  },
  validInput: {
    borderColor: Theme.lightGrey1,
  },
  errorInput: {
    borderColor: Theme.red
  },
  iconWrapper: {},
  startIcon: {
    marginRight: 16,
  },
  endIcon: {
    marginLeft: 16,
  },
  browseInput: {
    marginVertical: 16,
    flex: 1,
  },
  browsePlaceholder: {
    ...textStyles.formLabel,
    color: Theme.black,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 14,
  },
  infoMsg: {
    ...textStyles.infoText,
    color: Theme.grey,
    marginLeft: 4,
  }
})

export default FormInput;