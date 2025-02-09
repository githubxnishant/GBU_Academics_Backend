import mongoose from "mongoose";

const subSchema = mongoose.Schema(
    {
        subCode: {
            type: String,
            required: true,
            unique: true,
        },
        subName: {
            type: String,
            required: true,
        },
        year2025: {
            year: {
                type: Number,
            },
            midSem: {
                type: String,
            },
            endSem: {
                type: String,
            },
        },
        year2024: {
            year: {
                type: Number,
            },
            midSem: {
                type: String,
            },
            endSem: {
                type: String,
            },
        },
        year2023: {
            year: {
                type: Number,
            },
            midSem: {
                type: String,
            },
            endSem: {
                type: String,
            },
        },
        year2022: {
            year: {
                type: Number,
            },
            midSem: {
                type: String,
            },
            endSem: {
                type: String,
            },
        },
    }, 
    {
        timestamps: true,
    }
)

export default mongoose.model('ece', subSchema);