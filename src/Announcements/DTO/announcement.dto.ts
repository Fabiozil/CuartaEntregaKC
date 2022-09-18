import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsBoolean,
    IsOptional,
    IsEnum,
} from "class-validator";
import { AnnouncementTags } from "../Enum/announcementTags";

export class CreateAnnouncementDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    sell: Boolean;

    @IsNumber()
    @IsNotEmpty()
    price: Number;

    @IsString()
    @IsNotEmpty()
    photo: String;

    @IsNotEmpty()
    @IsOptional()
    @IsEnum(AnnouncementTags, { message: "Invalid tag" })
    tags: String[];
}

export class GetAnnouncementsDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}
