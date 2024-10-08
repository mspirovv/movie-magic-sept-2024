import { kMaxLength } from "buffer";
import { Schema,model,Types } from "mongoose";
import { type } from "os";

const movieSchema = new Schema ({
    title: {type: String,
        required: true,
        minLength: 5,
        validate: [/^[A-Za-z-0-9 ]+$/,'Title can contain only alpha numeric characters!'],
    },
    genre: {type: String,
        required: true,
        lowercase: true,
        minLength: 5,
        validate: [/^[A-Za-z-0-9 ]+$/,'Genre can contain only alpha numeric characters!'],
    },
    director:{type: String,
        required: true,
        minLength: 5,
        validate: [/^[A-Za-z-0-9 ]+$/,'Director can contain only alpha numeric characters!'],
    },
    year: {type: Number,
        required: true,
        min: [1900, ' Cannot add movies older than 1900 year'],
        max: [2024, 'Canot add movies after 2024'],
    },
    rating:{type: Number,
        validate: {
            validator: function(value) {
                if (this.year >= 2000) {
                    return !!value;
                }
                return true;
                
            },
            message: 'Rating is required for movies after 2000 year',
         
        },
        min: [1, 'Rating should be at least 1'],
        max: [5, 'Rating cannot be higher than 5'],
    }, 
    description:{type: String,
        required: true,
        min: [20,'Description must be at least 20 characters'],
        validate: [/^[A-Za-z-0-9 ]+$/,'Director can contain only alpha numeric characters!'],
    },
    imageUrl: {type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid image URL!']
    },
    casts: [{
        character: {type: String,
        minLength:5,
        validate: [/^[A-Za-z-0-9 ]+$/,'Title can contain only alpha numeric characters!']
        },
        cast: {
               type: Types.ObjectId,
               ref: 'Cast'
        }
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;