import { Schema,model } from "mongoose";

const castSchema = new Schema ({
    name: { type:String,
         validate: [/^[A-Za-z-0-9 ]+$/,'Title can contain only alpha numeric characters!'],
    },
    age: {type: Number,
        min: 1,
        max: 120
    
},    born: {type:String,
    validate: [/^[A-Za-z-0-9 ]+$/,'Title can contain only alpha numeric characters!'],
    min:10 
},
    chararacter: String,
    imageUrl: {
         type: String,
         validate: [/^https?:\/\//, 'Invalid image URL!']
    },
});

const Cast = model('Cast', castSchema);

export default Cast;