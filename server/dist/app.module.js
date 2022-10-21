"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const collections_module_1 = require("./collections/collections.module");
const words_module_1 = require("./words/words.module");
const files_module_1 = require("./files/files.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_HOST),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            collections_module_1.CollectionsModule,
            words_module_1.WordsModule,
            files_module_1.FilesModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map