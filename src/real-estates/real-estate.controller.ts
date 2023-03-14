import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { ApiAuth } from 'src/decorators/apiAuth.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { RealEstateService } from './real-estate.service';

@Controller('real-estates')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @ApiAuth('real-estates')
  @Get()
  findAll() {
    return this.realEstateService.findAll();
  }

  @ApiExcludeEndpoint()
  @Auth('real-estates')
  @Post()
  create(@Body() createRealEstateDto: CreateRealEstateDto) {
    return this.realEstateService.create(createRealEstateDto);
  }

  @ApiExcludeEndpoint()
  @Auth('real-estates')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstateService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @Auth('real-estates')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRealEstateDto: UpdateRealEstateDto,
  ) {
    return this.realEstateService.update(id, updateRealEstateDto);
  }

  @ApiExcludeEndpoint()
  @Auth('real-estates')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstateService.remove(id);
  }
}
