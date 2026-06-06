import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class DoctorService {
 constructor(private prisma: PrismaService,) { }
 
  async searchDoctors(query: any) {
  const {
    search = "",
    page = 1,
    limit = 5,
    minRating,
    maxFee,
  } = query;

  return this.prisma.doctor.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              specialization: {
                contains: search,
              },
            },
          ],
        },
        minRating
          ? {
              rating: {
                gte: Number(minRating),
              },
            }
          : {},
        maxFee
          ? {
              consultationFee: {
                lte: Number(maxFee),
              },
            }
          : {},
      ],
    },
    skip: (page - 1) * limit,
    take: Number(limit),
  });
}

}
