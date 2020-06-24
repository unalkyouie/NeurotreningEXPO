import { StyleSheet, Dimensions } from 'react-native';

export const colors = {
  midnightGreen: '#1a535c',
  mediumTurquise: '#4ecdc4',
  mintCream: '#f7fff7',
  bittersweet: '#ff6b6b',
  yellow: '#ffe66d',
  richBlack: '#011627',
  radicalRed: '#ff3366',
  tiffanyBlue: '#2ec4b6',
  cultured: '#f6f7f8',
  carolinaBlue: '#20a4f3',
};
const { width, height } = Dimensions.get('window');
export const appStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: colors.mintCream,
    justifyContent: 'center',
    width: 0.8 * width,
    height: 0.8 * height,
    flex: 1,
  },
  titleText: {
    alignSelf: 'center',
    color: colors.mintCream,
    fontSize: 24,
    marginVertical: 30,
    opacity: 1,
    textAlign: 'center',
    width: 0.8 * width,
  },
});
