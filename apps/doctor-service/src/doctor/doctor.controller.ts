import { Controller, Get, Query } from '@nestjs/common';
import { DoctorService } from "./doctor.service"

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) { }
  @Get("search")
  search(@Query() query: any) {
    return this.doctorService.searchDoctors(query);
  }
}
