import { Model, ModelCtor } from "sequelize/types";
import { Op } from "sequelize";
const raw = { raw: true };

function crudService<T extends Model>(model: ModelCtor<T>): any {
  return {
    all: async (query: any): Promise<any[]> => {
      let init: number = 0;
      let final: number = 20;
      const { offset, limit } = query;
      if (offset && limit) {
        init = Number(offset);
        final = Number(limit);
      }
      return await model.findAll({
        ...raw,
        offset: init,
        limit: final,
        order: [["id", "ASC"]],
      });
    },
    filterAll: (query: any, field: string = ""): Promise<T> => {
      const { ids, offset, limit } = query.where;
      let init: number = 0;
      let final: number = 20;
      let list: string[] = [];

      if (ids) {
        list = ids.split(",");
        delete query.where.ids;
        query = { where: { [field]: { [Op.in]: list }, ...query.where } };
      }
      if (offset && limit) {
        init = Number(offset);
        final = Number(limit);
        delete query.where.offset;
        delete query.where.limit;
      }
      return model
        .findAll({
          ...raw,
          ...query,
          offset: init,
          limit: final,
          order: [["id", "ASC"]],
        })
        .catch(errCallback);
    },
    find: (query: any): Promise<T> => {
      return model.findOne({ ...raw, ...query }).catch(errCallback);
    },
    create: (body: Model<T>): Promise<T> => {
      return model.create(body, raw).catch(errCallback);
    },
    update: (id: string, body: Model<T>) => {
      return model.update(body, { where: { id } }).catch(errCallback);
    },
    bulkCreate: (data: Model<T>[]) => {
      return model.bulkCreate(data).catch(errCallback);
    },
    deleteIn: (query: any): Promise<any> => {
      return model.destroy({ ...raw, ...query }).catch(errCallback);
    },

    deleteOne: (id: string) => {
      return model.destroy({ where: { idZoho: id } }).catch(errCallback);
    },
    deleteAll: () => {
      return model
        .destroy({
          where: {},
          truncate: true,
        })
        .catch(errCallback);
    },
  };
}
const errCallback = (err: any) => {
  console.error(err);
  return err;
};
export default crudService;
