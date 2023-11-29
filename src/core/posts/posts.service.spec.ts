import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsObjectsProvider } from './posts-objects.provider';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/new-post.dto';
import mongoose, { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { PostDetails } from './db-schemas/post.schema';

describe('PostsService', () => {
  let service: PostsService;
  let postsObjectsProvider: PostsObjectsProvider;
  let postDBModel: Model<PostDetails>;

  const post1: Post = {
    id: 1,
    title: 'evgeny will write test tommorow',
    body: 'very long post',
    userId: 1,
  };
  const post2: Post= {
    id: 2,
    userId: 2,
    title: 'evgeny is writing test today',
    body: 'very long post 2',
  };

  const mockPosts = [post1,post2];

  const mockingPostsModelRepository = {
    find: jest.fn(),
    create: jest.fn(),
  };

  const mockPostObjectsProvider = () => ({
    fetchAllPosts: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PostsObjectsProvider, useFactory: mockPostObjectsProvider },
        {
          provide: getModelToken(PostDetails.name),
          useValue: mockingPostsModelRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postsObjectsProvider =
      await module.get<PostsObjectsProvider>(PostsObjectsProvider);
    postDBModel = module.get<Model<PostDetails>>(
      getModelToken(PostDetails.name),
    );
  });

  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.disconnect();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('First post is the biggest', async () => {
    (postsObjectsProvider.fetchAllPosts as jest.Mock).mockResolvedValue(mockPosts);
    const biggestPost = await service.findBiggestTitle();
    expect(biggestPost).toEqual(post1);
  });

  it('Add new Post', async () => {
    const postToAdd: CreatePostDto = {
      title: 'tested-title',
      body: 'unittestPost2',
      userId: 6,
    };

    const addedPostObject = {
      _id: '5f9e9b3b9d9b3c1b7c3e3b1b',
      title: 'tested-title',
      body: 'unittestPost2',
      userId: 6,
      postId: 1,
    };

    jest.spyOn(postDBModel, 'create').mockResolvedValue(addedPostObject as any);

    const justAddedPost = await service.addNewPost(postToAdd);
    console.log(justAddedPost);
    expect(addedPostObject).toMatchObject(postToAdd);
  });

  it('Get all Posts', async () => {
    jest.spyOn(postDBModel, 'find').mockResolvedValue(mockPosts as any);
    const allPostsFromDB = await service.getDBPosts();
    expect(postDBModel.find).toHaveBeenCalled();
    expect(allPostsFromDB).toEqual(mockPosts); 
  });

});
