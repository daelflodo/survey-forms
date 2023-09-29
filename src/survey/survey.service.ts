import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    try {
      const surveyFound = await this.surveyRepository.findOne({
        where: {
          fullName: createSurveyDto.fullName,
          phoneNumber: createSurveyDto.phoneNumber,
        },
      });

      if (surveyFound) {
        throw new ConflictException('Existe un número asociado a ese nombre', {
          cause: new Error(),
          description: 'ERROR_CONFLICT',
        });
      }

      const survey = await this.surveyRepository.save(createSurveyDto);
      return survey;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const surveyFound = await this.surveyRepository.find();
      if (!surveyFound.length) {
        throw new NotFoundException('No hay Encuestas');
      }
      return surveyFound;
    } catch (error) {
      throw error;
    }
  }
  async findDetail(name: string) {
    try {
      const surveyFound = await this.surveyRepository
        .createQueryBuilder('survey')
        .where('survey.name ILIKE :name', { name: `%${name}%` })
        .getMany();

      if (!surveyFound.length) {
        throw new NotFoundException('No hay Encuestas');
      }
      return surveyFound;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const surveyFoundById = await this.surveyRepository.findOneById(id);
      if (!surveyFoundById) {
        throw new NotFoundException('No se encontró la Encuesta');
      }
      return surveyFoundById;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    try {
      const surveyFound = await this.surveyRepository.findOneById(id);
      if (!surveyFound) {
        throw new NotFoundException('No se encontró la Encuesta');
      }
      Object.assign(surveyFound, updateSurveyDto);
      return this.surveyRepository.save(surveyFound);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const surveyFound = await this.surveyRepository.findOne({
        where: { id },
      });
      if (!surveyFound) {
        throw new NotFoundException('No se encontró la Encuesta');
      }
      const deleteSurvey = await this.surveyRepository.delete(surveyFound);
      return deleteSurvey;
    } catch (error) {
      throw error;
    }
  }
}

// import {
//   ConflictException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { CreateSurveyDto } from './dto/create-survey.dto';
// import { UpdateSurveyDto } from './dto/update-survey.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Survey } from './entities/survey.entity';
// import { UUID } from 'crypto';

// @Injectable()
// export class SurveyService {
//   constructor(
//     @InjectRepository(Survey)
//     private readonly surveyRespository: Repository<Survey>,
//   ) {}
//   async create(createSurveyDto: CreateSurveyDto) {
//     const surveyFound = await this.surveyRespository.findOne({
//       where: {
//         fullName: createSurveyDto.fullName,
//         phoneNumber: createSurveyDto.phoneNumber,
//       },
//     });

//     if (surveyFound)
//       throw new ConflictException('Existe un numero asociado a ese nombre', {
//         cause: new Error(),
//         description: 'ERROR_CONFLICT',
//       });
//     const survey = await this.surveyRespository.save(createSurveyDto);
//     return survey;
//   }

//   async findAll() {
//     const surverFound = await this.surveyRespository.find();
//     if (!surverFound.length) throw new NotFoundException('No hay Encuestas');
//     return surverFound;
//   }

//   async findOne(id: UUID) {
//     const surveyFoundById = await this.surveyRespository.findOneById(id);
//     if (!surveyFoundById)
//       throw new NotFoundException('No se encontro la Encuesta');
//     return surveyFoundById;
//   }

//   async update(id: UUID, updateSurveyDto: UpdateSurveyDto) {
//     const surveyFound = await this.surveyRespository.findOneById(id);
//     if (!surveyFound) {
//       throw new NotFoundException('No se encontro la Encuesta');
//     }
//     Object.assign(surveyFound, updateSurveyDto);
//     return this.surveyRespository.save(surveyFound);
//   }

//   async remove(id: UUID) {
//     const surveyFound = await this.surveyRespository.findOneById(id);
//     if (!surveyFound) throw new NotFoundException('No se encontro la Encuesta');
//     await this.surveyRespository.delete(id);
//     return 'Encuesta Eliminada';
//   }
// }
