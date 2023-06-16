import React, { useMemo, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, CustomIcon, FormInput, Screen, YoutubePreview } from "../../components";

import { NavigationParams } from "../../navigation/NavigationParams";
import RouteNames from "../../navigation/RouteNames";
import { IconsVariant } from "../../components/CustomIcons/CustomIcon";
import { AntDesignIconsNames } from "../../components/CustomIcons/IconNames";
import Theme from "../../assets/theme/theme.styles";
import { textStyles } from "../../assets/theme/shared.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YouTubeVideoInfo } from "../../models/Youtube";

const DownloadingScreen = ({
  navigation, 
  route,
}: StackScreenProps<NavigationParams, RouteNames.DownloadingScreen>) => {
  const {bottom} = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const videoDetails = useMemo<YouTubeVideoInfo>(() => route?.params?.videoDetails, [route?.params?.videoDetails]);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Screen>
      <View style={[styles.root, !!bottom && bottom > 0 ? {paddingBottom: bottom} : styles.staticPaddingBottom]}>
        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <CustomIcon variant={IconsVariant.AntDesign} name={AntDesignIconsNames.youtube} size={24} color={Theme.red} />
            <Text style={styles.headerTitle}>MP3 Downloader</Text>
          </View>
          <YoutubePreview details={videoDetails}/>
          {/* TODO: Add loader */}
        </View>
        <Button 
          title={'Download Another MP3'}
          color={isLoading ? Theme.lightPurple : Theme.purple}
          onPress={handleGoBack}
          style={styles.button}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerTitle: {
    ...textStyles.header,
    marginLeft: 8,
  },
  contentWrapper: {
    width: '100%',
    flex: 1,
  },
  button: {
    alignSelf: 'flex-end'
  },
  staticPaddingBottom: {
    paddingBottom: 30,
  }
})

export default DownloadingScreen;