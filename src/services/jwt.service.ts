import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken";
import Auth from "../entities/auth.entity";
import JwtAuthPayload from "../types/JwtAuthPayload";

@Injectable()
export class JwtService {
  signToken(auth: Auth) {
    return sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        data: { role: auth.role, id: auth.id }
      },
      process.env.JWT_KEY
    );
  }

  signRecreateToken(auth: Auth) {
    return sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1,
        data: { role: auth.role, id: auth.id }
      },
      process.env.RECREATE_JWT_KEY
    );
  }

  verifyRecreateToken(token: string) {
    return verify(token, process.env.RECREATE_JWT_KEY) as {
      data: JwtAuthPayload;
    };
  }

  verifyToken(token: string) {
    return verify(token, process.env.JWT_KEY) as {
      data: JwtAuthPayload;
    };
  }
}
