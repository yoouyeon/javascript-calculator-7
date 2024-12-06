// @ts-check

import InputView from './InputView.js';
import OutputView from './OutputView.js';
import CustomError from './CustomError.js';

class App {
  #separator = [',', ':'];

  async run() {
    const input = await InputView.getInput();
    this.parseSeparator(input);
    const result = this.calculate(input);
    OutputView.printResult(result);
  }

  /**
   * @param {string} input - 입력받은 문자열
   * @description 구분자를 결정하는 함수
   */
  parseSeparator(input) {
    const customSeparator = App.extractCustomSeparator(input);
    if (customSeparator) {
      App.validateCustomSeparator(customSeparator);
      this.#separator = customSeparator;
    }
  }

  /**
   * @param {string} input - 입력받은 문자열
   * @returns {string[] | null} - 커스텀 구분자 배열을 반환, 기본 구분자를 사용하는 경우 null 반환
   * @description 구분자를 결정하는 함수
   */
  static extractCustomSeparator(input) {
    const SEPERATOR_REGEX = /^\/\/(.*?)\\n/;
    const matched = input.match(SEPERATOR_REGEX);
    if (matched) return matched[1].split('');
    return null;
  }

  /**
   * @param {string} input - 입력받은 문자열
   * @returns {number} - 문자열 덧셈 결과를 반환
   */
  calculate(input) {
    const numbers = App.extractNumbers(input, this.#separator);
    App.validateNumbers(numbers);
    return App.sum(numbers);
  }

  /**
   * @param {string} input - 입력받은 문자열
   * @param {string[]} separator - 구분자 배열
   * @returns {number[]} - 숫자 배열을 반환
   * @description 문자열을 입력받아 숫자를 추출하는 함수
   */
  static extractNumbers(input, separator) {
    let numberString = input;
    const SEPERATOR_REGEX = /^\/\/(.*?)\\n/;
    const matched = input.match(SEPERATOR_REGEX);
    if (matched) numberString = input.replace(SEPERATOR_REGEX, '');
    return numberString.split(new RegExp(`[${separator.join('')},\\n]`)).map((num) => {
      if (num === '') return 0;
      return parseInt(num, 10);
    });
  }

  /**
   * @param {number[]} numbers - 숫자 배열
   * @returns {number} - 더한 값을 반환
   */
  static sum(numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  }

  /**
   * @param {string[]} separator - 구분자 배열
   * @description 커스텀 구분자 유효성 검사 함수
   */
  static validateCustomSeparator(separator) {
    if (separator.length === 0)
      throw new CustomError('커스텀 구분자는 최소 1개 이상이어야 합니다.');
    if (separator.length > 1) throw new CustomError('커스텀 구분자는 1개만 가능합니다.');
  }

  /**
   * @param {number[]} numbers - 숫자 배열
   * @description 숫자 유효성 검사 함수
   */
  static validateNumbers(numbers) {
    numbers.forEach((num) => {
      if (Number.isNaN(num)) throw new CustomError('숫자가 아닌 값이 포함되어 있습니다.');
      if (num < 0) throw new CustomError('음수가 포함되어 있습니다.');
    });
  }
}

export default App;
