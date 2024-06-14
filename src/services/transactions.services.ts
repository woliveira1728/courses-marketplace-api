import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { injectable } from "tsyringe";
import { TCreateTransactionSchema, TTransactionSchema } from "../schemas";


@injectable()
export class TransactionsServices {

    async register(body: TCreateTransactionSchema): Promise<TTransactionSchema> {

        const buyer = await prisma.user.findUnique({ where: { id: body.buyerId } });
        if (!buyer) {
            throw new AppError(404, "Buyer not found");
        }

        const owner = await prisma.user.findUnique({ where: { id: body.ownerId } });
        if (!owner) {
            throw new AppError(404, "Owner not found");
        }

        const course = await prisma.course.findUnique({ where: { id: body.courseId } });
        if (!course) {
            throw new AppError(404, "Course not found");
        }

        const transaction = await prisma.transaction.create({ data: body });

        return transaction;
        
    }

}