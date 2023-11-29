import { Injectable, Logger } from '@nestjs/common';
import { config } from '../../infra/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { PostDetails } from './db-schemas/post.schema';

@Injectable()
export class PostsObjectsProvider {
  myLogger: Logger;
  constructor(private readonly httpService: HttpService) {
    this.myLogger = new Logger(PostsObjectsProvider.name);
  }

  async fetchAllPosts(): Promise<PostDetails[]> {
    try {
      this.myLogger.log(`[${PostsObjectsProvider.name}] fetchAllPosts starting`);
      const response = await lastValueFrom(this.httpService.get<PostDetails[]>(config.ALL_POSTS_URL).pipe(
        map(response => response.data),
      ));
      this.myLogger.log(`[${PostsObjectsProvider.name}] fetchAllPosts end`);
      return response;
    } catch (err) {
      this.myLogger.error(`ERROR in fetchAllPost: ${err}`);
      throw err;
    }
  }
}
