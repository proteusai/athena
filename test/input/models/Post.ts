import { autoincrement, Default, id, map, model } from '../../../src';
import { User } from './User';

@model
export class Post {
    @id @map('_id') @Default(autoincrement())
    id: number;
    title: string;
    content: string;
    authorId: number;
    author: User;
}
