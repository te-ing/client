export const numberWithCommas = (num: number): string => {
  const parts: number = num;
  const result = parts.toString().split('.');
  return result[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (result[1] ? '.' + result[1] : '');
};

//숫자를 넣으면 3자리마다 , 찍히고 소수점 2자리 까지 표현
