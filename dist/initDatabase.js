"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const readline = require("readline");
// conectar a la base de datos
const MongoDBHelper = require("./src/common/Helpers/mongodb");
// cargar los modelos
const Announcement = require("./Models/announcements");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const resetResponse = yield question("Are you sure you want to initialize database again?");
        if (!resetResponse) {
            process.exit();
        }
        yield initAnnouncements();
    });
}
main().catch((err) => console.log("Hubo un error:", err));
function initAnnouncements() {
    return __awaiter(this, void 0, void 0, function* () {
        const deleted = yield Announcement.deleteMany();
        console.log(`Deleted ${deleted.deletedCount} announcements.`);
        // crear agentes iniciales
        const inserted = yield Announcement.insertMany([
            {
                name: "Delicious Hamburger",
                sell: true,
                price: 10000,
                tags: ["Lifestyle", "Work"],
                photo: "DeliciousHamburger.jpg",
            },
            {
                name: "Powerful Clock",
                sell: false,
                price: 4000000,
                tags: ["Lifestyle", "Mobile"],
                photo: "Omnitrix.png",
            },
        ]);
        console.log(`Created ${inserted.length} announcements.`);
    });
}
function question(string) {
    return new Promise((resolve, reject) => {
        const ifc = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        ifc.question(string, (answer) => {
            ifc.close();
            if (answer.toLowerCase() === "yes") {
                resolve(true);
                return;
            }
            resolve(false);
        });
    });
}
