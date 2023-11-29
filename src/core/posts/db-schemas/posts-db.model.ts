import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDetails } from './post.schema';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostDBModel {
  constructor(
    @InjectModel(PostDetails.name) private postsModel: Model<PostDetails>,
  ) {}

  async getAllPosts() {
    const allPost = await this.postsModel.find(
      {},
      { postId: 1, title: 1, body: 1, userId: 1 },
    );
    return allPost;
  }

  async createNewPost(post: Post) {
    const newPost = await this.postsModel.create(post);
    return newPost;
  }
}
