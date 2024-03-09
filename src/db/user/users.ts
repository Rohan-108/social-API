import mongoose, { Types } from "mongoose";
export interface UserType {
  username: string;
  email: string;
  password: string;
  pic?: string;
  _id?: Types.ObjectId;
  bio?: string;
}
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email: string) {
          return String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        message: (props: { value: string }) =>
          `Email${props.value} is invalid!`,
      },
    },
    password: { type: String, required: true, select: false },
    pic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/64/64572.png",
    },
    bio: { type: String },
  },
  { timestamps: true }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "postedBy",
});
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export const UserModel = mongoose.model<UserType>("User", userSchema);

//server actions on user model

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUser = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUser = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
