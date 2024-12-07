import App from './App.js';
import mockQuestions from './mockQuestions.js';
import getLogSpy from './getLogSpy.js';

describe('문자열 계산기 테스트', () => {
  describe('구분자 파싱 테스트', () => {
    test.each([
      { input: '//\\n1,2,3', expected: [] },
      { input: '//;\\n1;2;3', expected: [';'] },
      { input: '//;:\\n1;:2;:3', expected: [';', ':'] },
    ])(
      '커스텀 구분자를 사용하는 경우 커스텀 구분자 배열을 반환한다. (입력값: $input, 반환값: $expected)',
      ({ input, expected }) => {
        expect(App.extractCustomSeparator(input)).toEqual(expected);
      }
    );

    test.each([
      { input: '1,2,3', expected: null },
      { input: '1;2;3', expected: null },
    ])(
      '커스텀 구분자를 사용하지 않는 경우 null을 반환한다. (입력값: $input, 반환값: $expected)',
      ({ input, expected }) => {
        expect(App.extractCustomSeparator(input)).toEqual(expected);
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

  describe('숫자 합산 테스트', () => {
    test.each([
      { numbers: [0], expected: 0 },
      { numbers: [1, 2], expected: 3 },
      { numbers: [1, 2, 3], expected: 6 },
    ])(
      '숫자 배열을 입력받아 합산 결과를 반환한다. (입력값: $numbers, 반환값: $expected)',
      ({ numbers, expected }) => {
        expect(App.sum(numbers)).toBe(expected);
      }
    );
  });

  describe('유효성 검사 테스트', () => {
    test.each([{ input: [NaN] }, { input: [1, -2] }])(
      '유효하지 않은 숫자가 포함된 경우 에러를 반환한다. (입력값: $input)',
      ({ input }) => {
        expect(() => App.validateNumbers(input)).toThrow('[ERROR]');
      }
    );

    test.each([{ input: [1, 2] }, { input: [1, 2, 3] }])(
      '유효한 숫자가 포함된 경우 에러를 반환하지 않는다. (입력값: $input)',
      ({ input }) => {
        expect(() => App.validateNumbers(input)).not.toThrow();
      }
    );

    test.each([{ separator: [] }, { separator: [',', ':'] }])(
      '유효하지 않은 커스텀 구분자인 경우 에러를 반환한다. (입력값: $separator)',
      ({ separator }) => {
        expect(() => App.validateCustomSeparator(separator)).toThrow('[ERROR]');
      }
    );

    test.each([{ separator: [';'] }])(
      '유효한 커스텀 구분자인 경우 에러를 반환하지 않는다. (입력값: $separator)',
      ({ separator }) => {
        expect(() => App.validateCustomSeparator(separator)).not.toThrow();
      }
    );
  });

  describe('통합 테스트', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test.each([
      { input: '', expected: 0 },
      { input: '1', expected: 1 },
      { input: '1,2', expected: 3 },
      { input: '1,2,3', expected: 6 },
      { input: '1,2:3', expected: 6 },
    ])(
      '문자열을 입력받아 구분자로 구분한 숫자를 더한 결과를 반환한다. (입력값: $input, 반환값: $expected)',
      async ({ input, expected }) => {
        // given
        mockQuestions([input]);
        const logSpy = getLogSpy();
        const outputs = [`결과 : ${expected}`];

        // when
        const app = new App();
        await app.run();

        // then
        outputs.forEach((output) => {
          expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
        });
      }
    );

    test.each([{ input: '//;\\n1;2;3', expected: 6 }])(
      '커스텀 구분자를 사용하는 경우에 숫자를 더한 결과를 출력한다. (입력값: $input, 반환값: $expected)',
      async ({ input, expected }) => {
        // given
        mockQuestions([input]);
        const logSpy = getLogSpy();
        const outputs = [`결과 : ${expected}`];

        // when
        const app = new App();
        await app.run();

        // then
        outputs.forEach((output) => {
          expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
        });
      }
    );

    test.each([
      { input: '1,2,-3', case: '음수를 입력하는 경우' },
      { input: '1,2,3a', case: '숫자가 아닌 값을 입력하는 경우' },
      { input: '//\\n1,2,3', case: '커스텀 구분자가 0개인 경우' },
      { input: '//;#\\n1;2;3', case: '커스텀 구분자가 2개 이상인 경우' },
    ])('$case 에러를 반환한다.', async ({ input }) => {
      // given
      mockQuestions([input]);
      const app = new App();

      // when, then
      await expect(app.run()).rejects.toThrow('[ERROR]');
    });
  });
});
