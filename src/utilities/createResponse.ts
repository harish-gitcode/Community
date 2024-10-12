import { Response } from "express";

export const createErrorResponse = (
  res: Response,
  error: string,
  status = 500
) => {
  res.status(status).json({
    status: false,
    content: {
      error,
    },
  });
};
export const createDataResponse = <TData, TMeta>(
  res: Response,
  data: TData,
  meta: TMeta | undefined = undefined,
  status = 200
) => {
  res.status(status).json({
    status: true,
    content:
      data === undefined
        ? undefined
        : {
            data,
            meta,
          },
  });
};
