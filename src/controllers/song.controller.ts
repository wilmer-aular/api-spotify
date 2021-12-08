import { CrudController } from "../cruds";

import * as service from "../services/song.service";

const { all, filter, byId, deleteAll } = CrudController(service, "song");

export { all, filter, byId, deleteAll };
