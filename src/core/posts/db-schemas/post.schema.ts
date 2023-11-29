import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, version } from 'mongoose';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';

@Schema({
  timestamps: true,
})
export class PostDetails extends Document {
  @Prop({
    unique: true,
  })
  postId: number;

  @Prop()
  userId: number;

  @Prop()
  title: string;

  @Prop()
  body: string;
}

export const PostSchema = SchemaFactory.createForClass(PostDetails);

PostSchema.plugin(AutoIncrementID, {
  field: 'postId',
  startAt: 1,
} satisfies AutoIncrementIDOptions);