import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { join } from "path";
import { MailerModule } from "@nestjs-modules/mailer";
import * as process from "process";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.yandex.ru",
        secure: true,
        port: 465,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.USER_PASS
        }
      },
      defaults: {
        from: "\"No Reply\" <noreply@example.com>"
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {
}
