import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ required: false })
  receiveNotifications: boolean;

  @Prop({ required: false })
  recieveEmail: boolean;

  @Prop({ required: false })
  recieveSMS: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
