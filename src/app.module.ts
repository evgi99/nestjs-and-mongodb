import { Module } from '@nestjs/common';
import { PostsModule } from './core/posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './core/health/health.module';

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
export class AppModule {}
