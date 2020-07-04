import React, { useEffect, Dispatch } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import WebView from 'react-native-webview';
import { Video } from '../api/YouTubeProvider';
import { VideoActions, setVideo } from '../reducers/videoReducer';
const { height, width } = Dimensions.get('window');

const VideoView = (props: { video: Video }) => {
  const dispatch = useDispatch<Dispatch<VideoActions>>();

  useEffect(() => {
    dispatch(setVideo(props.video.id));
  }, []);

  return (
    <WebView
      style={styles.video}
      source={{
        uri: `https://youtube.com/embed/${props.video.id}`,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
  },
  video: {
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    height: 0.5 * height,
    width: 0.9 * width,
  },
});

export default VideoView;
