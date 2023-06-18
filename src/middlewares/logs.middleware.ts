import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import Auth from "../entities/auth.entity";

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(
    request: Request & { auth: Auth },
    response: Response,
    next: NextFunction
  ) {
    response.on("finish", () => {
      const { method, originalUrl, body, auth } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} \n User: ${JSON.stringify(
        auth,
        null,
        2
      )}\nBody: ${JSON.stringify(body, null, 2)} \n`;

      for (const key of Object.keys(body)) {
        if (key === "password") {
          body[key] = "*****";
        }
      }

      if (statusCode >= 500) {
        return this.logger.error(message, "http");
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}

export default LogsMiddleware;
