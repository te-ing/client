import * as R from '../constants/regExp';

export const handleEncode = (word: string) => {
    if(word.match(R.korean)) {
        const encodedWord = encodeURI(word);
        return encodedWord;
    } else return word;
}