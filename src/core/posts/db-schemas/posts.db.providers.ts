import { Connection } from 'mongoose';
import { PostDetails, PostSchema } from './post.schema';

export const postsDBProviders = [
  {
    provide: 'POSTS_MODEL',
    useFactory: (connection: Connection) => connection.model(PostDetails.name, PostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];