import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/** I want a class User where primary key is id and there are three columns: name, email, password */

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: "user" }) // Default role is "user"
    role: "user" | "admin"; // Only allow these values

    constructor(name: string, email: string, password: string, role: "user" | "admin") {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
