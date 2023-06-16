import React, { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomIcon, { IconsVariant } from "./CustomIcons/CustomIcon";
import { AntDesignIconsNames } from "./CustomIcons/IconNames";
import Theme from "../assets/theme/theme.styles";
import { YouTubeVideoInfo } from "../models/Youtube";
import { textStyles } from "../assets/theme/shared.styles";

interface YoutubePreviewProps {
  details: YouTubeVideoInfo;
}

const YoutubePreview = ({ details }: YoutubePreviewProps) => {
  if (details == null) {
    return null;
  }

  return (
    <View style={styles.card}>
        <Image 
          source={{uri: details?.thumbnails[0]?.url}}
          defaultSource={require('../assets/images/image_placeholder.png')}
          style={styles.image}
          resizeMode="cover"
        />
      <Text style={styles.title}>{details?.title}</Text>
      <View style={styles.bottomSection}>
        {details?.viewCount && <View style={styles.sectionWrapper}>
          <CustomIcon 
            variant={IconsVariant.AntDesign}
            name={AntDesignIconsNames.views}
            size={16}
            color={Theme.grey}
          />
          <Text style={styles.sectionText}>{`${details.viewCount} Views`}</Text>
        </View>}
        {details?.likes && <View style={styles.sectionWrapper}>
          <CustomIcon 
            variant={IconsVariant.AntDesign}
            name={AntDesignIconsNames.like}
            size={16}
            color={Theme.grey}
          />
          <Text style={styles.sectionText}>{`${details.likes} Likes`}</Text>
        </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.lightGrey3,
    borderRadius: 8,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '50%',
    marginTop: 24,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 8,
  },
  title: {
    ...textStyles.formLabel,
    marginVertical: 16,
    width: '100%',
  },
  bottomSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sectionWrapper :{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 32,
  },
  sectionText: {
    ...textStyles.cardInfo,
    color: Theme.grey,
    marginLeft: 8,
  }
})

export default YoutubePreview;