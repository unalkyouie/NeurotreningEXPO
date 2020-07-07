import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import YouTubeProvider, {
  NEUROTRENING_ID,
  RELAKASACJA_ID,
  Video,
} from '../api/YouTubeProvider';
import { appStyles, colors } from '../assets/styles';
import Button from '../components/Button';
import VideoView from '../components/VideoView';

const { height, width } = Dimensions.get('window');

const VideoScreen = () => {
  const [chosenVideo, setChosenVideo] = useState<Video>({
    title: '',
    id: '',
    position: 999,
  });
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [videoLoaded, setVideoLoaded] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean[]>([]);
  const [chosenPlaylist, setChosenPlaylist] = useState(NEUROTRENING_ID);

  useEffect(() => {
    getVideosList();
    getFirstVideo();
    setIsVideoPlaying(() => {
      const arr = videoList.map(() => false);
      arr[0] = true;
      return arr;
    });
    setVideoLoaded(true);
  }, [chosenPlaylist]);

  useEffect(() => {
    setIsVideoPlaying((prev) => {
      const arr = [...prev];
      arr[videoList.indexOf(chosenVideo)] = !arr[
        videoList.indexOf(chosenVideo)
      ];
      return arr;
    });
  }, [chosenVideo]);

  const getVideosList = async () => {
    setVideoList([]);
    try {
      const result = await YouTubeProvider.getVideoList(chosenPlaylist);
      setVideoList(result.response);
    } catch (error) {
      console.log(error);
    }
  };

  const getFirstVideo = async () => {
    try {
      const result = await YouTubeProvider.getLastVideo(chosenPlaylist);
      setChosenVideo(result.response);
    } catch (error) {
      console.log(error);
    }
  };
  const getVideo = async (title: string) => {
    const video = await YouTubeProvider.getVideoByTitle(chosenPlaylist, title);
    return video;
  };

  return (
    <View
      style={[
        appStyles.container,
        {
          alignItems: 'stretch',
          justifyContent: 'space-between',
          paddingTop: 0.1 * height,
        },
      ]}
    >
      {!videoLoaded ? (
        <>
          <ActivityIndicator animating={!videoLoaded} size="large" />
        </>
      ) : (
        <>
          <Text style={[appStyles.titleText, { marginBottom: 5 }]}>
            Wybierz i obejrzyj film
          </Text>
          <View style={styles.componentWrapper}>
            <View style={styles.videoWrapper}>
              <VideoView video={chosenVideo} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 0.5 * height,
              }}
            >
              <View style={styles.switchContainer}>
                <Button
                  onPress={() => {
                    setChosenPlaylist(NEUROTRENING_ID);
                  }}
                  style={[
                    styles.switchButton,
                    chosenPlaylist === NEUROTRENING_ID &&
                      styles.switchButtonActive,
                  ]}
                  text="Neurotrening"
                  textStyle={[
                    styles.switchButtonText,
                    chosenPlaylist === NEUROTRENING_ID &&
                      styles.switchButtonActiveText,
                  ]}
                />
                <Button
                  onPress={() => {
                    setChosenPlaylist(RELAKASACJA_ID);
                  }}
                  style={[
                    styles.switchButton,
                    chosenPlaylist === RELAKASACJA_ID &&
                      styles.switchButtonActive,
                  ]}
                  text="Relaksacja"
                  textStyle={[
                    styles.switchButtonText,
                    chosenPlaylist === RELAKASACJA_ID &&
                      styles.switchButtonActiveText,
                  ]}
                />
              </View>
              <ScrollView contentContainerStyle={styles.listContainer}>
                {videoList.map((item) => {
                  return (
                    <Button
                      style={[
                        styles.videoListButton,
                        isVideoPlaying[videoList.indexOf(item)] &&
                          styles.videoListCheckedButton,
                      ]}
                      text={item.title}
                      textStyle={styles.buttonText}
                      onPress={() => {
                        setIsVideoPlaying(videoList.map(() => false));
                        setVideoLoaded(false);
                        getVideo(item.title);
                        setChosenVideo(item);
                        setVideoLoaded(true);
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors.mintCream,
    fontSize: 16,
  },
  componentWrapper: {
    alignItems: 'center',
    height,
    width,
  },
  list: {
    borderRadius: 10,
    marginHorizontal: 30,
  },
  listContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
  switchButton: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
    width: '50%',
  },
  switchButtonActive: {
    backgroundColor: colors.mintCream,
    borderRadius: 25,
    margin: 0,
  },
  switchButtonText: {
    color: colors.mintCream,
    fontSize: 12,
    marginHorizontal: 0,
    minWidth: 0,
    textAlign: 'center',
  },
  switchButtonActiveText: {
    color: colors.midnightGreen,
  },
  switchContainer: {
    backgroundColor: colors.midnightGreen,
    borderRadius: 25,
    flexDirection: 'row',
    margin: 10,
    width: 0.8 * width,
  },
  videoListButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 10,
    borderWidth: 0,
    margin: 5,
    width: 0.8 * width,
    padding: 30,
  },
  videoListCheckedButton: {
    backgroundColor: colors.midnightGreen,
  },
  videoWrapper: {
    height: height * 0.3,
    width: width,
  },
});
export default VideoScreen;
