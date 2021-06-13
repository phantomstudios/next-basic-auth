import auth, { BasicAuthResult } from "basic-auth";
import { DocumentContext } from "next/document";
import compare from "tsscmp";

export interface BasicAuthConfig {
  realm: string;
  message: string;
  credentialsEnvVar: string;
}

interface BasicAuthCredentials {
  name: string;
  pass: string;
}

const baseConfig: BasicAuthConfig = {
  realm: "site",
  message: "401 Access Denied",
  credentialsEnvVar: "BASIC_AUTH_CREDENTIALS",
};

const basicAuth = async (
  { req, res }: DocumentContext,
  config?: Partial<BasicAuthConfig>
) => {
  if (!req || !res || !res.end) return;

  const conf = { ...baseConfig, ...config };
  const credentials = getCredentials(conf.credentialsEnvVar);
  if (!credentials) return;

  const currentUser = auth(req);
  if (!currentUser || !check(currentUser, credentials)) {
    res.statusCode = 401;
    res.setHeader("WWW-Authenticate", `Basic realm="${conf.realm}"`);
    res.end(conf.message);
  }
};

const getCredentials = (credsEnvVar: string): BasicAuthCredentials | null => {
  const credsString = process.env[credsEnvVar];
  if (!credsString) return null;
  const credsParts = credsString.split(":");
  if (credsParts.length !== 2) return null;

  return {
    name: credsParts[0],
    pass: credsParts[1],
  };
};

const check = (
  currentUser: BasicAuthResult,
  credentials: BasicAuthCredentials
) =>
  compare(currentUser.name, credentials.name) &&
  compare(currentUser.pass, credentials.pass);

export default basicAuth;
