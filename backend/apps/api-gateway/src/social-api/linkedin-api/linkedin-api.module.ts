import { Module } from "@nestjs/common";

import { LinkedinApiController } from "./linkedin-api.controller";
import { LinkedinApiService } from "./linkedin-api.service";

@Module({
    controllers: [LinkedinApiController],
    providers: [LinkedinApiService],
    exports: [LinkedinApiService],
  })
  export class LinkedinApiModule {}