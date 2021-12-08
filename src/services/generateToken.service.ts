import { IConfiguration, Configutation } from "../models/configuration.model";
import moment from "moment";
import { CrudService } from "../cruds";
import * as conector from "../conector/spotify.conector";

interface IToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

const service = CrudService(Configutation);

export async function handleToken(): Promise<string> {
  const config = await service.find({ where: { key: "spotify" } });
  if (config) {
    const created = moment(config.updatedAt);
    const addHours = moment(config.updatedAt).add(1, "hours");
    const isBetween = moment().isBetween(created, addHours);

    if (!isBetween) {
      const tokensGenerated = await conector.authToken();
      config.token = tokensGenerated.accessToken;
      config.updatedAt = new Date();
      await service.update(config.id, config);
      return tokensGenerated.accessToken;
    }
    return config.token;
  } else {
    const generateToken: IToken = await conector.authToken();
    const { accessToken } = generateToken;
    await service.create({ token: accessToken, key: "spotify" });

    return accessToken;
  }
}
