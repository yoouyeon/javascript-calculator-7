import App from './App.js';

describe('문자열 계산기 테스트', () => {
  describe('구분자 파싱 테스트', () => {
    test.each([
      { input: '//\\n1,2,3', expected: [] },
      { input: '//;\\n1;2;3', expected: [';'] },
      { input: '//;:\\n1;:2;:3', expected: [';', ':'] },
    ])(
      '커스텀 구분자를 사용하는 경우 커스텀 구분자 배열을 반환한다. (입력값: $input, 반환값: $expected)',
      ({ input, expected }) => {
        expect(App.parseString(input)).toEqual(expected);
      }
    );

    test.each([
      { input: '1,2,3', expected: null },
      { input: '1;2;3', expected: null },
    ])(
      '커스텀 구분자를 사용하지 않는 경우 null을 반환한다. (입력값: $input, 반환값: $expected)',
      ({ input, expected }) => {
        expect(App.parseString(input)).toEqual(expected);
      }
    );
  });

  describe('숫자 파싱 테스트', () => {
    test.each([
      { input: '', separator: [',', ':'], expected: [0] },
      { input: '1,2', separator: [',', ':'], expected: [1, 2] },
      { input: '1,2,3', separator: [',', ':'], expected: [1, 2, 3] },
      { input: '1,2:3', separator: [',', ':'], expected: [1, 2, 3] },
      { input: '//;\\n1;2;3', separator: [';'], expected: [1, 2, 3] },
      { input: '//;:\\n1:2;3', separator: [';', ':'], expected: [1, 2, 3] },
    ])(
      '문자열을 입력받아 숫자 배열을 반환한다. (입력값: $input, 구분자: $separator, 반환값: $expected)',
      ({ input, separator, expected }) => {
        expect(App.extractNumbers(input, separator)).toEqual(expected);
      }
    );
  });
});
