import { Client } from "discord.js";
import pingCommandHandler from "./pingHandler";
import chatCommandHandler from "./chatHandler";

export default (client: Client): void => {
  pingCommandHandler(client);
  chatCommandHandler(client);
};
