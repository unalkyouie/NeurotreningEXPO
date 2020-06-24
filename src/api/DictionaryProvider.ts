import React from 'react';
import {Dictionary} from './Dictionary';
const API = '';
const API_ENDPOINT = 'https://pl.wiktionary.org/w/api.php';
const PARAMS = '?action&query&list=search&srsearch=a&format=json';
const fetchDictionary = async (word: string) => {
  const apiResponse = await fetch(
    API_ENDPOINT + `?action=query&list=search&srsearch=${word}&format=json`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return apiResponse.json();
};

class DictionaryProvider extends Dictionary {
  static async getWords() {
    const response: string[] = [];
    return {response};
  }
  static async numberOfWords(word: string) {
    const res = await fetchDictionary(word);
    console.log(res);
    const response = res.query.search.length;
    return {response};
  }
}

export default DictionaryProvider;
