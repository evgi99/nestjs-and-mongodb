import { Injectable } from '@nestjs/common';
import { PostsObjectsProvider } from './posts-objects.provider';
import { CreatePostDto } from './dto/new-post.dto';
import { PostDetails } from './db-schemas/post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsObjectProvider: PostsObjectsProvider,
    @InjectModel(PostDetails.name) private postDBModel: Model<PostDetails>,
  ) {}

  async findBiggestTitle(): Promise<PostDetails> {
    try {
      const allposts = await this.postsObjectProvider.fetchAllPosts();
      const biggestPost = allposts.reduce((prev, current) =>
        prev.title.length > current.title.length ? prev : current,
      );
      return biggestPost;
    } catch (err) {
      console.log(`ERROR in findBiggestTitle: ${err}`);
      throw err;
    }
  }

  async addNewPost(newPost: CreatePostDto): Promise<PostDetails>{
    const post = await this.postDBModel.create(newPost);
    return post as PostDetails;
  }

  async getDBPosts(): Promise<PostDetails[]> {
    const allPost = await this.postDBModel.find(
      {},
      { postId: 1, title: 1, body: 1, userId: 1 },
    );
    return allPost as PostDetails[];
  }
}
