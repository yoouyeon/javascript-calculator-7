import { Console } from '@woowacourse/mission-utils';

const InputView = {
  inputMessage: '덧셈할 문자열을 입력해주세요.\n',
  getInput: async () => {
    const input = await Console.readLineAsync(InputView.inputMessage);
    return input;
  },
};

export default InputView;
