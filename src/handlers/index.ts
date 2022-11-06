import { Client } from "discord.js";
import pingCommandHandler from "./pingHandler";
import chatCommandHandler from "./chatHandler";
import memeCommandHandler from "./memeHandler";
import feelCommandHandler from "./feelHandler";

export default (client: Client): void => {
  pingCommandHandler(client);
  chatCommandHandler(client);
  memeCommandHandler(client);
  feelCommandHandler(client);
};
