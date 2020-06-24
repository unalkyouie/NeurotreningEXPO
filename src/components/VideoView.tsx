import React, {useEffect, Dispatch} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import VideoComponent from 'react-native-video';

import {Video} from '../api/YouTubeProvider';
import {VideoActions, setVideo} from '../reducers/videoReducer';

const VideoView = (props: {video: Video}) => {
  const dispatch = useDispatch<Dispatch<VideoActions>>();

  useEffect(() => {
    dispatch(setVideo(props.video.id));
  }, []);

  return (
    <VideoComponent
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
    height: 200,
    width: 300,
  },
});

export default VideoView;
