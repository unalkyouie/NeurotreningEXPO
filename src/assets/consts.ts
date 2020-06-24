export const lettersList: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'r',
  's',
  't',
  'u',
  'w',
  'z',
];

export const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

export const consonant = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'r',
  's',
  't',
  'w',
  'z',
];

export const number = () => {
  return Math.floor(Math.random() * 9);
};

export const bigNumber = () => {
  return Math.floor(Math.random() * (100 - 10) + 10);
};
