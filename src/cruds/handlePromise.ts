import { Response } from "express";

export async function handlePromise<T>(
  promise: Promise<T>,
  res: Response,
  service?: string
): Promise<void> {
  try {
    const data = await promise;
    res.json(data);
  } catch (error) {
    console.error({ error, service });
    res.status(500), res.json({ error: "An error occurred", service });
  }
}
