import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

import { Button, CustomIcon, FormInput, Screen } from "../../components";

import { NavigationParams } from "../../navigation/NavigationParams";
import RouteNames from "../../navigation/RouteNames";
import { IconsVariant } from "../../components/CustomIcons/CustomIcon";
import { AntDesignIconsNames } from "../../components/CustomIcons/IconNames";
import Theme from "../../assets/theme/theme.styles";
import { textStyles } from "../../assets/theme/shared.styles";
import { FormInputVariant } from "../../components/FormInput";
import ytdl from "react-native-ytdl";
import ytdlCore from 'ytdl-core';

const InitialScreen = ({
  navigation
}: StackScreenProps<NavigationParams, RouteNames.InitialScreen>) => {
  const [youtubeLink, setYoutubeLink] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');

  const validInput = useMemo<boolean>(
    () => youtubeLink !== '' && youtubeLink != null && filePath !== '' && filePath != null
  , [filePath, youtubeLink])

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClear = () => {
    setYoutubeLink('')
  }

  const handleStartDownloading = async () => {
    try {
    const videoInfo = await ytdl.getInfo(youtubeLink);
    const videoDetails = videoInfo.videoDetails;

    if (videoDetails) {
      navigation.navigate(RouteNames.DownloadingScreen, {
        videoDetails: videoDetails,
      });
    }
  } catch (error) {
    console.log('Error fetching YouTube video details:', error);
  }
  }

  useEffect(() => {
    setFilePath('');
    setYoutubeLink('');
  }, [])

  return (
    <Screen>
      <View style={styles.header}>
        <CustomIcon variant={IconsVariant.AntDesign} name={AntDesignIconsNames.youtube} size={24} color={Theme.red} />
        <Text style={styles.headerTitle}>MP3 Downloader</Text>
      </View>
      <View style={styles.formWrapper}>
        <FormInput 
          value={youtubeLink} 
          label={"YouTube link"} 
          placeholder={"Paste you YouTube link here"}
          onChangeInput={(value) => setYoutubeLink(value)} 
          startIcon={{
            variant: IconsVariant.AntDesign,
            name: AntDesignIconsNames.link,
            size: 20,
            color: Theme.black,
            shown: true,
          }}
          endIcon={{
            variant: IconsVariant.AntDesign,
            name: AntDesignIconsNames.close,
            size: 20,
            color: Theme.grey,
            shown: youtubeLink !== '',
            onPress: handleClear,
          }}
          others={{
            autoComplete: 'off',
            autoCorrect: false,
            autoCapitalize: 'none',
            importantForAutofill: 'no',
          }}
        />
        <FormInput 
          value={filePath}
          label={"Destination Folder"} 
          variant={FormInputVariant.BROWSE}
          placeholder={filePath || "File path"}
          infoMessage={"Where you want to save the MP3"}
          onChangeInput={(value) => setFilePath(value)} 
          startIcon={{
            variant: IconsVariant.AntDesign,
            name: AntDesignIconsNames.folder,
            size: 20,
            color: Theme.black,
            shown: true,
          }}
        />
      </View>
      <Button 
        title={'Download'}
        loadingTitle={'Grabbing info...'} 
        disabled={isLoading || !validInput}
        loading={isLoading}
        color={(isLoading || !validInput) ? Theme.lightPurple : Theme.purple}
        onPress={handleStartDownloading}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerTitle: {
    ...textStyles.header,
    marginLeft: 8,
  },
  formWrapper: {
    marginVertical: 24,
  }
})

export default InitialScreen;