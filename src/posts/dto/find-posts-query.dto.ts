import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { IntersectionType } from "@nestjs/mapped-types";
import { SortOrderDto } from "../../common/dto/sort-order.dto";

export class FindPostsQueryDto extends IntersectionType(PaginationQueryDto, SortOrderDto) {
  @IsOptional()
  @IsString({message: 'Title must be a string'})
  @MaxLength(100, {message: `Title search can't exceed 100 characters`})
  title?: string;
}