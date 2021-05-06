import { Command } from "./types/command";

export class CommandRegistry {
  public commands = new Map<String, Function>();

  call<T>(command: Command<T>) {
    const cmd = this.commands.get(command.name);

    if (cmd) {
      return cmd(command.args);
    }
  }
}
