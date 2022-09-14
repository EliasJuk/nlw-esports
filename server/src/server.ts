import express, { response } from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHoursStringToMinuts } from './utils/convert-hours-string-to-minuts'
import { convertMinutsToHourString } from './utils/convert-minuts-to-hour-string'

const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhosts'
}))

const prisma = new PrismaClient({
  log: ['query']
})

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })

  return response.json(games);
})

app.get('/ads', (request, response) => {
  return response.json([]);
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  
  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaing: body.yearsPlaing,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hoursStart: convertHoursStringToMinuts(body.hoursStart),
      hoursEnd: convertHoursStringToMinuts(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return response.status(201).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  
  const ads = await prisma.ad.findMany({
    select:{
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaing: true,
      hoursStart: true,
      hoursEnd: true,
      createdAt: true,
    },
    where: {
      gameId: gameId
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutsToHourString(ad.hoursStart),
      hoursEnd: convertMinutsToHourString(ad.hoursEnd)
    }
  }))
})


app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })
  

  return response.json({
    discord: ad.discord,
  })  
})


app.listen(3333)