import { Command } from "./command";

export class CommandRegistry {
  public commands = new Map<string, (...args: any[]) => void>();

  call<T>(command: Command<T>): any {
    const cmd = this.commands.get(command.name);

    if (cmd) {
      return cmd(command.args);
    }
  }
}
