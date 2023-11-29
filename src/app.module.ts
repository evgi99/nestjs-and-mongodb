import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PostsModule } from './core/posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './core/health/health.module';
import { ReverseProxyMiddleware } from './infra/middleware/reverse-proxy.middleware';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URL || 'mongodb://localhost:27017/posts',
      }),
    }),
    PostsModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyMiddleware)
      .forRoutes({ path: '/all-posts-from-web', method: RequestMethod.ALL });
  }
}
