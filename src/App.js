import InputView from './InputView.js';

class App {
  #separator = [',', ':'];

  async run() {
    const input = await InputView.getInput();
    // 파싱해서 구분자를 결정하고 숫자를 추출
    // 숫자를 더해서 반환
    // 결과 출력
  }

  #parseString(input) {
    // 문자열을 입력받아 구분자를 찾아내는 함수
    // 구분자를 찾아내어 배열로 반환
  }

  #extractNumbers(input) {
    // 문자열을 입력받아 숫자를 추출하는 함수
    // 숫자를 추출하여 배열로 반환
  }

  #sum(numbers) {
    // 숫자를 입력받아 더하는 함수
    // 더한 값을 반환
  }
}

export default App;
