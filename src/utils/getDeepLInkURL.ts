import {Linking} from 'react-native';

const getDeepLinkURL = (urlToOpen: string) =>
  new Promise<string>((resolve, reject) => {
    const listenForAuthorizationCode = ({url}: {url: string}) => {
      Linking.removeEventListener('url', listenForAuthorizationCode);
      resolve(url);
    };
    Linking.addEventListener('url', listenForAuthorizationCode);
    Linking.openURL(urlToOpen).catch((err) => reject(err));
  });

export default getDeepLinkURL;
