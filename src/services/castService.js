
import Cast from "../models/Cast.js"

const getAll = () => Cast.find();

const getAllWithout = (castIds) => {
    return Cast.find({ _id: { $nin: castIds } });
};
const create = (cast) => Cast.create(cast);



export default {
    create,
    getAll,
    getAllWithout,

}