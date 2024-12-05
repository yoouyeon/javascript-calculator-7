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
});
