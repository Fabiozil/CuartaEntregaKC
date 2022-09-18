"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAnnouncementsDTO = exports.CreateAnnouncementDTO = void 0;
const class_validator_1 = require("class-validator");
const announcementTags_1 = require("../Enum/announcementTags");
class CreateAnnouncementDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], CreateAnnouncementDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)()
], CreateAnnouncementDTO.prototype, "sell", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)()
], CreateAnnouncementDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], CreateAnnouncementDTO.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(announcementTags_1.AnnouncementTags, { message: "Invalid tag" })
], CreateAnnouncementDTO.prototype, "tags", void 0);
exports.CreateAnnouncementDTO = CreateAnnouncementDTO;
class GetAnnouncementsDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], GetAnnouncementsDTO.prototype, "name", void 0);
exports.GetAnnouncementsDTO = GetAnnouncementsDTO;
