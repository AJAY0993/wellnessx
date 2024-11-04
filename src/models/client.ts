import mongoose, { Document, Schema } from 'mongoose'

export interface IClient extends Document {
    name: string
    email: string
    phone: string
    age: number
    goal: string
    coachId: mongoose.Types.ObjectId
    progressNotes?: string[]
    lastUpdated?: Date
    weight?: number
    bmi?: number
    sessions?: {
        dateTime: Date
        sessionType: string
    }[]
}

const ClientSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        age: { type: Number, required: true },
        goal: { type: String, required: true },
        coachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        progressNotes: { type: String },
        lastUpdated: { type: Date },
        weight: { type: Number },
        bmi: { type: Number },
        sessions: [
            {
                dateTime: { type: Date, required: true }, // Combined date and time
                sessionType: {
                    type: String,
                    enum: ['Consultation', 'Follow-up'],
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
)

const Client = mongoose.model<IClient>('Client', ClientSchema)
export default Client
