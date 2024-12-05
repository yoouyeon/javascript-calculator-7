import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  resultMessage: '결과 : ',
  printResult(result) {
    Console.print(`${this.resultMessage}${result}`);
  },
};

export default OutputView;
