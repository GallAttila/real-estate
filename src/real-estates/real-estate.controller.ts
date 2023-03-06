import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/Auth.decorator';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { RealEstateService } from './real-estate.service';

@ApiTags('real-estates (apiKey*, bearerToken*)')
@Controller('real-estates')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Auth()
  @Get()
  findAll() {
    return this.realEstateService.findAll();
  }

  @Auth()
  @Post()
  create(@Body() createRealEstateDto: CreateRealEstateDto) {
    return this.realEstateService.create(createRealEstateDto);
  }

  @ApiExcludeEndpoint()
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstateService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRealEstateDto: UpdateRealEstateDto,
  ) {
    return this.realEstateService.update(id, updateRealEstateDto);
  }

  @ApiExcludeEndpoint()
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateService.remove(id);
  }
}
