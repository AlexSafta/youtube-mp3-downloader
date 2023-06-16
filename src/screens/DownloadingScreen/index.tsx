import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, CustomIcon, FormInput, Screen, YoutubePreview } from "../../components";

import { NavigationParams } from "../../navigation/NavigationParams";
import RouteNames from "../../navigation/RouteNames";
import { IconsVariant } from "../../components/CustomIcons/CustomIcon";
import { AntDesignIconsNames } from "../../components/CustomIcons/IconNames";
import Theme from "../../assets/theme/theme.styles";
import { textStyles } from "../../assets/theme/shared.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { STEPS, YouTubeVideoInfo } from "../../models/Youtube";
import * as Progress from 'react-native-progress';
import * as FileSystem from 'expo-file-system';
import ytdl from "react-native-ytdl";

const DownloadingScreen = ({
  navigation, 
  route,
}: StackScreenProps<NavigationParams, RouteNames.DownloadingScreen>) => {
  const {bottom} = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<STEPS | null>(STEPS.DOWNLOAD);

  const filePath = useMemo<string>(() => route?.params?.filePath, [route?.params?.filePath]);
  const youtubeLink = useMemo<string>(() => route?.params?.youtubeLink, [route?.params?.youtubeLink]);
  const videoDetails = useMemo<YouTubeVideoInfo>(() => route?.params?.videoDetails, [route?.params?.videoDetails]);

  const progressTitle = useMemo<string | null>(() => {
    switch(step) {
      case STEPS.DOWNLOAD:
        return 'Downloading…';
      case STEPS.CONVERT:
        return 'Converting…';
      case STEPS.SAVE:
        return 'Saving…';
      case STEPS.SUCCESS:
        return 'Success';
      case STEPS.FAIL:
        return 'Failed';
      default:
        return null;
    }
  }, [step])

  const progressColor = useMemo<string>(() => {
    switch(step) {
      case STEPS.DOWNLOAD:
        return Theme.blue;
      case STEPS.CONVERT:
        return Theme.yellow;
      case STEPS.SAVE:
        return Theme.lightBlue;
      case STEPS.SUCCESS:
        return Theme.green;
      case STEPS.FAIL:
        return Theme.lightRed;
      default:
        return Theme.grey;
    }
  }, [step])

  const handleGetMP3 = useCallback(async () => {
    setStep(STEPS.DOWNLOAD);
    try {
      const audioInfo = await ytdl.getBasicInfo(youtubeLink);
      const audioFormats = ytdl.filterFormats(audioInfo.formats, 'audioonly');

      // Select the desired audio format (e.g., highest quality)
      const audioFormat = audioFormats[0];

      await FileSystem.makeDirectoryAsync(filePath, { intermediates: true });
      
      // Download the audio file
      const audioFileUri = `${filePath}/audio.mp3`;
      const downloadResumable = FileSystem.createDownloadResumable(
        audioFormat.url,
        audioFileUri
      );
      const { uri } = await downloadResumable.downloadAsync();

      console.log('Audio downloaded successfully:', uri);
    } catch (error) {
      console.log('Error downloading audio:', error);
    }
  } ,[]);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  useEffect(() => {
    (async () => await handleGetMP3())();
  }, []);



  return (
    <Screen>
      <View style={[styles.root, !!bottom && bottom > 0 ? {paddingBottom: bottom} : styles.staticPaddingBottom]}>
        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <CustomIcon variant={IconsVariant.AntDesign} name={AntDesignIconsNames.youtube} size={24} color={Theme.red} />
            <Text style={styles.headerTitle}>MP3 Downloader</Text>
          </View>
          <YoutubePreview details={videoDetails}/>
          <View style={styles.progressWrapper}>
            <View style={styles.progressDetails}>
              {progressTitle && <Text style={styles.progressTextLeft}>{progressTitle}</Text>}
              <Text style={styles.progressTextRight}></Text>
            </View>
            {progressColor && <Progress.Bar progress={0.3} color={progressColor} style={styles.loader} />}
          </View>
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
  },
  progressWrapper: {
    marginTop: 24,
    width: '100%',
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    marginBottom: 12,
  },
  progressTextLeft: {
    ...textStyles.cardInfo,
    color: Theme.black,
  },
  progressTextRight: {
    ...textStyles.cardInfo,
    color: Theme.grey,
  },
  loader: {
    width: '100%'
  }
})

export default DownloadingScreen;