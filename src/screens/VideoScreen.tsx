import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import YouTubeProvider, {
  NEUROTRENING_ID,
  RELAKASACJA_ID,
  Video,
} from '../api/YouTubeProvider';
import { appStyles, colors } from '../assets/styles';
import ADButton from '../components/Button';
import VideoView from '../components/VideoView';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const VideoScreen = () => {
  const navigation = useNavigation();
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
    console.log('videoScreen ' + videoList);
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
    console.log('videoScreen2 ' + videoList);
  }, [chosenVideo]);

  const getVideosList = async () => {
    setVideoList([]);
    try {
      const result = await YouTubeProvider.getVideoList(chosenPlaylist);
      setVideoList(result.response);
    } catch (error) {
      console.log(error + ' message ' + error.message);
    }
  };

  const getFirstVideo = async () => {
    try {
      const result = await YouTubeProvider.getLastVideo(chosenPlaylist);
      setChosenVideo(result.response);
    } catch (error) {
      console.log(error + ' message ' + error.message);
    }
  };
  const getVideo = async (title: string) => {
    const video = await YouTubeProvider.getVideoByTitle(chosenPlaylist, title);
    return video;
  };
  return (
    <ScrollView contentContainerStyle={[appStyles.container]}>
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
                minWidth: 300,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <View style={styles.switchContainer}>
                <ADButton
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
                <ADButton
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
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={videoList}
                renderItem={({ item }) => {
                  return (
                    <ADButton
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
                }}
                style={styles.list}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors.midnightGreen,
    fontSize: 16,
  },
  componentWrapper: {
    width: '100%',
    height: '80%',
  },
  list: {
    borderRadius: 10,
    marginHorizontal: 30,
    height: '100%',
    maxWidth: 300,
  },
  listContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  switchButton: {
    backgroundColor: 'grey',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
  },
  switchButtonActive: {
    backgroundColor: colors.mintCream,
    borderRadius: 25,
    paddingHorizontal: 15,
    margin: 0,
  },
  switchButtonText: {
    color: colors.mintCream,
    fontSize: 12,
    marginHorizontal: 0,
    minWidth: 0,
  },
  switchButtonActiveText: {
    color: colors.midnightGreen,
    fontSize: 15,
  },
  switchContainer: {
    alignItems: 'stretch',
    backgroundColor: 'grey',
    borderRadius: 25,
    flexDirection: 'row',
    maxWidth: 300,
    margin: 10,
    justifyContent: 'space-between',
  },
  videoListButton: {
    backgroundColor: colors.mintCream,
    borderColor: 'transparent',
    borderRadius: 10,
    borderWidth: 0,
    margin: 5,
    maxWidth: 300,
    minWidth: 200,
  },
  videoListCheckedButton: {
    backgroundColor: colors.mediumTurquise,
  },
  videoWrapper: {
    marginLeft: 20,
  },
});
export default VideoScreen;
