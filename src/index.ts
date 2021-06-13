import auth, { BasicAuthResult } from "basic-auth";
import { DocumentContext } from "next/document";
import compare from "tsscmp";

interface MiddlewareConfig {
  name: string;
  pass: string;
  realm: string;
  message: string;
}

export const baseConfig: MiddlewareConfig = {
  name: "admin",
  pass: "password",
  realm: "site",
  message: "401 Access Denied",
};

const basicAuthMiddleware = async (
  { req, res }: DocumentContext,
  config?: Partial<MiddlewareConfig>
) => {
  if (!req || !res || !res.end) return;

  const conf = { ...baseConfig, ...config };

  const currentUser = auth(req);
  if (!currentUser || !check(currentUser, conf)) {
    res.statusCode = 401;
    res.setHeader("WWW-Authenticate", `Basic realm="${conf.realm}"`);
    res.end(conf.message);
  }
};

const check = (currentUser: BasicAuthResult, config: MiddlewareConfig) =>
  compare(currentUser.name, config.name) &&
  compare(currentUser.pass, config.pass);

export default basicAuthMiddleware;
