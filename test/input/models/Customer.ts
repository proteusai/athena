import { auto, db, Default, id, map, model } from '../../../src';

@model
export class Customer {
    @id @map('_id') @Default(auto()) @db.ObjectId
    id: string;
    @db.String
    name: string;
    age: number;
    emails: Array<string>;
    @db.String
    phone?: string;
    @db.String
    address?: string;
    @db.String
    city?: string;
    @db.String
    state?: string;
    @db.String
    zip?: string;
    @db.String
    country?: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
