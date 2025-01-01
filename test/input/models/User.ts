import { auto, db, Default, id, map, model } from '../../../src';
import { Post } from './Post';

@model
export class User {
    @id @map('_id') @Default(auto()) @db.ObjectId
    id: string;
    @db.String
    name: string;
    posts: Array<Post>;
}
