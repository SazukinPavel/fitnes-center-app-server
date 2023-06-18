import Admin from "../entities/admin.entity";
import Client from "../entities/client.entity";
import Manager from "../entities/manager.entity";

export type User = Admin | Client | Manager;
