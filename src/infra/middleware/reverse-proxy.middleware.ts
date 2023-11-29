import { Logger, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from '../config';

export class ReverseProxyMiddleware implements NestMiddleware {
  private middlewareLogger = new Logger(ReverseProxyMiddleware.name);

  private proxy = createProxyMiddleware({
    target: config.ALL_POSTS_URL,
    changeOrigin: true,
    pathRewrite: {
      '/api/v1/all-posts-from-web': '',
    },
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      //   proxyReq.setHeader('x_auth_user', "admin_token_only"); // adding custom header to the request.
      this.middlewareLogger.log(
        `Proxying ${req.method} request originally made to '${req.originalUrl}'...`,
      );
    },
  });

  constructor() {}

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
