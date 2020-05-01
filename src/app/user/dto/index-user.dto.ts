import { IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class IndexUserQueryDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit: number;
}
