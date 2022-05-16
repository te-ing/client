export const numberWithCommas = (num: number): string => {
  let parts: number | string[] = num;
  parts = parts.toString().split('.');
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
};

//숫자를 넣으면 3자리마다 , 찍히고 소수점 2자리 까지 표현
