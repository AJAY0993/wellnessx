import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: 'admin' | 'coach'
    specialization?: string
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'coach'], required: true },
    specialization: {
        type: String,
        required: function (this: IUser) {
            return this.role === 'coach'
        },
    },
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User
