import faker from "faker";
import { SurveyModel } from "../models/survey-model";

export const mockSurveyListModel = (): SurveyModel[] =>
    Array.from({ length: 5 }).map(() => ({
        id: faker.datatype.uuid(),
        question: faker.random.words(),
        answers: [
            {
                answer: faker.random.words(),
                image: faker.internet.avatar(),
            },
            {
                answer: faker.random.words(),
                image: faker.internet.avatar(),
            },
        ],
        date: faker.date.recent(),
        didAnswer: faker.datatype.boolean(),
    }));
