import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../guards/auth.guard";
import { Roles } from "../decorators";
import AddAdminDto from "./dto/AddAdmin.dto";
import { AdminsService } from "./admins.service";

@Controller("admins")
@UseGuards(RolesGuard)
export class AdminsController {
  constructor(private adminsService: AdminsService) {
  }

  @Post()
  @Roles("admin")
  add(@Body() addAdminDto: AddAdminDto) {
    return this.adminsService.add(addAdminDto);
  }

  @Delete(":id")
  @Roles("admin")
  delete(@Param("id") id: string) {
    return this.adminsService.delete(id);
  }
}
