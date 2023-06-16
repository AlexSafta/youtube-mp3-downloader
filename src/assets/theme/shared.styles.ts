import { StyleSheet } from 'react-native';
import Theme from './theme.styles';


export const textStyles = StyleSheet.create({
  // Plus Jakarta Sans
  header: {
    fontSize: 20,
    lineHeight: 32,
    fontStyle: "normal",
    fontFamily: Theme.fontFamily600,
  },
  formLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "normal",
    fontFamily: Theme.fontFamily600,
  },
  buttonTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "normal",
    fontFamily: Theme.fontFamily700,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 20,
    fontStyle: "normal",
    fontFamily: Theme.fontFamily500,
  },
  cardInfo: {
    fontSize: 12,
    lineHeight: 16,
    fontStyle: "normal",
    fontFamily: Theme.fontFamily600,
  }
});

export const sharedStyles = StyleSheet.create({});
