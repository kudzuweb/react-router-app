import 'dotenv/config';
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from 'drizzle-orm'
import { user as userTable } from './db/schema';

export const db = drizzle(process.env.DATABASE_URL!)

async function main() {
    const user: typeof userTable.$inferInsert = {
        id: "1",
        name: 'John',
        email: 'john@example.com',
    }


    const users = await db.select().from(userTable);
    console.log('Getting all users from the database:', users)

    await db.insert(userTable).values(users);
    console.log('New user created!')

    // const users: {
    //     id: number;
    //     name: string;
    //     age: number;
    //     email: string;
    // }

    await db
        .update(userTable)
        .set({
            id: "0",
        })
        .where(eq(userTable.email, user.email));
    console.log('User info updated!')

    await db.delete(userTable).where(eq(userTable.email, user.email));
    console.log('User deleted!')

};

if (import.meta.main) { main() };