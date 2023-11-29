import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { LogRequestInterceptor } from '../../infra/interceptors/logrequest.interceptor'
import { CreatePostDto } from './dto/new-post.dto';

@Controller('posts')
@UseInterceptors(LogRequestInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('post-with-longest-title')
  async findBiggestTitle() {
    try {
      const biggestPost = await this.postsService.findBiggestTitle();
      return biggestPost;
    } catch (err){
      console.log('ERROR in GET findBiggestTitle: ' + err)
      throw new HttpException('ERROR in GET findBiggestTitle: ',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('add-new-post')
  async addNewPost(@Body() createPostDto: CreatePostDto) {
    try {
      const biggestPost = await this.postsService.addNewPost(createPostDto);
      return biggestPost;
    } catch (err){
      console.log('ERROR in Post : ' + err)
      throw new HttpException('ERROR in POST new post: ',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-db-posts')
  async getDBPost() {
    const allPosts = await this.postsService.getDBPosts();
    return allPosts;
  }
}
