import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ReportsResolver {

    @Query(() => String)
    getReportById(): string {
        return "This is a report";
    }
}
