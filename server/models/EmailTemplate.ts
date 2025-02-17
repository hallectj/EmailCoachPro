import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class EmailTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;  // e.g., "Discount Offer", "Welcome Email"

  @Column()
  subject: string;  // e.g., "Exclusive Offer Just for You!"

  @Column({ default: false })  // New column for premium templates
  premium: boolean;

  @Column({ nullable: true })
  category: string;  // e.g., "Promotions", "Welcome", "Newsletters"

  @CreateDateColumn()
  createdAt: Date;

  @Column("json")
  template_data: object;  // Store template data or JSX, which can be used to generate the email HTML dynamically

  constructor(
    name: string,
    subject: string,
    category: string,
    premium: boolean,
    template_data: object,
    createdAt: Date
  ) {
    this.name = name;
    this.subject = subject;
    this.category = category || "";
    this.premium = premium || false;
    this.template_data = template_data;  // Store the template's data structure here
    this.createdAt = createdAt || new Date();
  }
}
