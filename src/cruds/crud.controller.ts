import { Request, Response } from "express";
import { handlePromise } from "./handlePromise";

const CrudController = (service: any, serviceName?: string): any => {
  return {
    all: (req: Request, res: Response): void => {
      handlePromise(service.all(req.query), res, serviceName);
    },
    filter: (req: Request, res: Response): void => {
      handlePromise(
        service.filter({ where: { ...req.query } }),
        res,
        serviceName
      );
    },
    byId: (req: Request, res: Response): void => {
      const { id } = req.params;
      handlePromise(service.byId(id), res, serviceName);
    },
    deleteAll: (req: Request, res: Response): void => {
      handlePromise(service.deleteAll(), res, serviceName);
    },
  };
};
export default CrudController;
