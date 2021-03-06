# next-basic-auth

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

Lightweight middleware to add [basic-auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) protection onto your [Next.js](https://nextjs.org/) site.

## Introduction

Do you have a site that is still in development or need to protect non production environments? Then this basic library is for you. It allows you to protect all your pages in one go by adding this middleware to your [`_document`](https://nextjs.org/docs/advanced-features/custom-document) template.

## Installation

Install this package with `npm`.

```bash
npm i @phntms/next-basic-auth
```

## Usage

```JSX
import basicAuth from "@phntms/next-basic-auth";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

const authConfig = {
  name: "john",
  pass: "letmein",
  message: "Go away!",
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    await basicAuth(ctx, authConfig);
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## basicAuth Arguments

- `ctx` : Required - The `DocumentContext` provided by `getInitialProps`.
- `config` : Optional - `BasicAuthMiddlewareConfig` object which allows you to change the default configuration.

## Configuration

You can override the configuration using these options...

- `name` : The username required for login, defaults to `admin`.
- `pass` : The password required for login, defaults to `password`.
- `realm` : The realm used for the basic-auth, defaults to `site`.
- `message` : The message to show upon unsuccessful login, defaults to `401 Access Denied`.

[npm-image]: https://img.shields.io/npm/v/@phntms/next-basic-auth.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@phntms/next-basic-auth
[npm-downloads-image]: https://img.shields.io/npm/dm/@phntms/next-basic-auth.svg
[npm-downloads-url]: https://npmcharts.com/compare/@phntms/next-basic-auth?minimal=true
[ci-image]: https://github.com/phantomstudios/next-basic-auth/workflows/test/badge.svg
[ci-url]: https://github.com/phantomstudios/next-basic-auth/actions
