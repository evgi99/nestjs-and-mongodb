import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsObjectsProvider } from './posts-objects.provider';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PostDetails, PostSchema } from './db-schemas/post.schema';  

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: PostDetails.name, schema: PostSchema },
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsObjectsProvider],
})
export class PostsModule {}
