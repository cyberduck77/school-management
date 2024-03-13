import { Entity } from "typeorm";
import { Profile } from "./profile.entity";

@Entity('administrators')
export class Admin extends Profile<Admin> {
  
}