import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PositionDocument = Position & Document;

@Schema({ collection: 'positions' })
export class Position extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  postedDate: string;

  @Prop({ required: true })
  education: string;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true })
  experience: number;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  applicants: number;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop({ required: true })
  location: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
