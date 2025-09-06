import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
class Report {
  @Prop()
  id: string;

  @Prop()
  serviceName: string;

  @Prop()
  executationTime: Date;

  @Prop()
  summary: Record<string, any>; //TODO: provide a more specific type if possible

  @Prop()
  createdAt: Date;

  @Prop()
  username: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
