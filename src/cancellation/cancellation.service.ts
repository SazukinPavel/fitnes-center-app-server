import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Cancellation from "../entities/cancellation.entity.";
import AddCancellationDto from "./dto/AddCancellation.dto";

@Injectable()
export class CancellationService {
  constructor(
    @InjectRepository(Cancellation)
    private cancellationRepository: Repository<Cancellation>
  ) {
  }

  add(dto: AddCancellationDto) {
    const cancellation = this.cancellationRepository.create(dto);

    return this.cancellationRepository.save(cancellation);
  }
}
