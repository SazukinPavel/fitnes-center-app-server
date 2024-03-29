import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import AddExerciseDto from "./dto/AddExercise.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../types/User";
import UpdateIsPayed from "./dto/UpdateIsPayed";
import Exercise from "../entities/exercise.entity";
import AddCancellationDto from "./dto/AddCancellation.dto";
import { CancellationService } from "../cancellation/cancellation.service";

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private cancellationService: CancellationService
  ) {
  }

  add(addExerciseDto: AddExerciseDto, manager: User) {
    const exercie = this.exerciseRepository.create({
      ...addExerciseDto,
      manager: { id: manager.id },
      exerciseInfo: { id: addExerciseDto.exerciseId },
      client: { id: addExerciseDto.clientId }
    });

    return this.exerciseRepository.save(exercie);
  }

  getAll() {
    return this.exerciseRepository.find({
      relations: ["client", "manager", "exerciseInfo", "cancellation"],
      order: { createdAt: "DESC" }
    });
  }

  getById(id: string) {
    return this.exerciseRepository.findOne({
      where: { id },
      relations: ["client", "manager", "exerciseInfo", "cancellation"]
    });
  }

  getByManager(authId: string) {
    return this.exerciseRepository.find({
      where: { manager: { id: authId } },
      relations: ["client", "manager", "exerciseInfo", "cancellation"],
      order: { createdAt: "DESC" }
    });
  }

  getByClient(authId: string) {
    return this.exerciseRepository.find({
      where: {
        client: { id: authId }
      },
      relations: ["manager", "exerciseInfo", "manager.auth", "cancellation"],
      order: { createdAt: "DESC" }
    });
  }

  delete(id: string) {
    return this.exerciseRepository.delete(id);
  }

  async deleteByManager(id: string, authId: string) {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
      relations: ["manager"]
    });

    if (exercise.manager.id == authId) {
      return this.delete(id);
    }

    throw new ForbiddenException("You not owner of this exersice!");
  }

  updateExercisePayed({ isPayed, id }: UpdateIsPayed) {
    return this.exerciseRepository.update(id, { isPayed });
  }

  async addCancellation({ exerciseId, ...dto }: AddCancellationDto) {
    const exercise = await this.getById(exerciseId);

    if (!exercise) {
      throw new BadRequestException("Такого занятия не существует");
    }

    const cancellation = await this.cancellationService.add(dto);

    await this.exerciseRepository.update(exerciseId, { cancellation });

    return this.getById(exerciseId);
  }
}
