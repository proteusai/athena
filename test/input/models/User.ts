import {
    auto,
    autoincrement,
    db,
    Default,
    Enum,
    id,
    ignore,
    map,
    model,
    relation,
    schema,
    unique,
} from '../../../src';
import { Post } from './Post';

enum Role {
    USER,
    ADMIN,
}

@Enum
@map('themes')
export class Theme {
    @map('dark')
    DARK: any;
    LIGHT: any;
}

@model
@schema('auth')
export class User {
    @id() @map('_id') @Default(auto()) @db.ObjectId
    id: string;
    @db.String()
    name?: string;
    @unique()
    email: string;
    @Default(Role.USER)
    role: Role;
    posts: Array<Post>;
    @ignore()
    profile?: Profile;
}

@model
@map('user_profiles')
@unique<Profile>({ name: "wow" }, ['id', 'userId'])
@id<Profile>(['id', 'userId'])
export class Profile {
    @map('_id') @Default(autoincrement())
    id: number;
    bio: string;
    @unique()
    userId: string;
    @relation<Profile, User>({ fields: ['userId'], references: ['id'] })
    user: User;
}
