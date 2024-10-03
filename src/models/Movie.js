import { kMaxLength } from "buffer";
import { Schema,model,Types } from "mongoose";
import { type } from "os";

const movieSchema = new Schema ({
    title: {type: String,
        required: true,
    },
    genre: {type: String,
        required: true,
        lowercase: true,
    },
    director:{type: String,
        required: true,
    },
    year: {type: Number,
        required: true,
        min: 1900,
        max: 2024,
    },
    rating:{type: Number,
        required: true,
        min: 1,
        max: 10,
    }, 
    description:{type: String,
        required: true,
    },
    imageUrl: {type: String,
        required: true,
    },
    casts: [{
        character: String,
        cast: {
               type: Types.ObjectId,
               ref: 'Cast'
        }
    }]
});

const Movie = model('Movie', movieSchema);

export default Movie;