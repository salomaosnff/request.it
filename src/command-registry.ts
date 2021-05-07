import { Command } from "./types/command";

export class CommandRegistry {
  public commands = new Map<String, Function>();

  add(name: string, fn: Function) {
    this.commands.set(name, fn);
    return this;
  }

  call<T>(command: Command<T>) {
    const cmd = this.commands.get(command.name);

    if (cmd) {
      return cmd(command.args);
    }
  }
}
