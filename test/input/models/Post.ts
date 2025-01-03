import { autoincrement, db, Default, id, map, model, now, relation, type, updatedAt, uuid } from '../../../src';
import { User } from './User';

type Json = {};

@model
export class Post {
    @id() @map('_id') @Default(autoincrement())
    id: number;
    title: string;
    content: string;
    authorId: number;
    @relation<Post, User>({ name: 'post_user', fields: ['authorId'], references: ['id'], onDelete: 'Cascade', onUpdate: 'Cascade' })
    author: User;
    @Default(false)
    published: boolean;
    categories: Array<Category>;
    @Default("{ \"hello\": \"world\" }")
    data: Json;
    photos: Array<Photo>;
    @Default(now())
    createdAt: Date;
    @updatedAt
    updatedAt: Date;
}

@model
@id<Category>({ name: 'id', fields: ['id', 'name'] })
export class Category {
    @Default(uuid(7))
    id: string;
    name: string;
    posts: Array<Post>;
}

export interface Photo {
    height: number;
    width: number;
    url: string;
}

@type
export class Image {
    @db.Char(300)
    @Default(300)
    height: number;
    @Default(300)
    width: number;
    @map('address')
    url: string;
}
