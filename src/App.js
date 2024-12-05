// @ts-check

import InputView from './InputView.js';

class App {
  #separator = [',', ':'];

  async run() {
    const input = await InputView.getInput();
    const customSeparator = App.parseString(input);
    if (customSeparator) {
      this.#separator = customSeparator;
    }
    // 숫자를 더해서 반환
    // 결과 출력
  }

  /**
   * @param {string} input - 입력받은 문자열
   * @returns {string[] | null} - 구분자 배열을 반환, 기본 문자열을 사용하는 경우 null 반환
   * @description 구분자를 결정하는 함수
   */
  static parseString(input) {
    const SEPERATOR_REGEX = /^\/\/(.*?)\\n/;
    const matched = input.match(SEPERATOR_REGEX);
    if (matched) {
      return matched[1].split('');
    }
    return null;
  }

  extractNumbers(input) {
    // 문자열을 입력받아 숫자를 추출하는 함수
    // 숫자를 추출하여 배열로 반환
  }

  sum(numbers) {
    // 숫자를 입력받아 더하는 함수
    // 더한 값을 반환
  }
}

export default App;
