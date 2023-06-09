import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'
import { ValidationPipe } from './common/pipes/validation.pipe'

async function start() {
    const PORT = process.env.PORT || 5000

    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
        .setTitle('Api for furniture-shop')
        .setDescription('Documetation for REST API')
        .setVersion('0.0.1')
        //   .addTag('TEST')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}
start()
