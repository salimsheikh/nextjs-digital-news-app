import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Export the model with the correct TypeScript type
const User = mongoose.models.User as Model<IUser> || mongoose.model<IUser>('User', UserSchema);

export default User;
