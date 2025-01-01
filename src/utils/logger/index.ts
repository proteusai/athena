import figlet from 'figlet';
import { blue, cyan, green } from 'kleur';
import { ConsoleMessage } from './console-message';

const newLine = '\n';

export default class Logger {
  static logTitleAndBanner() {
    console.log(
        blue(figlet.textSync(ConsoleMessage.TITLE, { horizontalLayout: 'full' }))
    );
    console.info(blue(`${ConsoleMessage.COMPANY}/${ConsoleMessage.TITLE}`));
    console.info(cyan(ConsoleMessage.BANNER));
    console.log();
  }

  static logCreatedObject(message: string) {
    console.info(cyan(`${ConsoleMessage.CREATED} ${message} ${newLine}`));
  }

  static logGeneratedFile(fileName: string) {
    console.info(green(`${ConsoleMessage.GENERATED} ${fileName} ${newLine}`));
  }

  static logSuccess(message: string) {
    console.info(green(`${ConsoleMessage.SUCCESS} ${message} ${newLine}`));
  }
}