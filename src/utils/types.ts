import { Languages } from '../hooks/useTranslation';

export type Score = {
	score: number;
	maxScore: number;
};

export type Country = {
	key: string;
	population: number;
	name: Record<Languages, string>;
	capital: Record<Languages, string>;
};

export const RoundsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const QuestionsArray = [1, 2, 3] as const;
export type Rounds = typeof RoundsArray[number];
export type Questions = typeof QuestionsArray[number];
export const NUMBER_OF_ROUNDS = Math.max(...RoundsArray);
export const NUMBER_OF_QUESTIONS = Math.max(...QuestionsArray);
export const MAX_SCORE =
	QuestionsArray.reduce((a, b) => a + b, 0) * NUMBER_OF_QUESTIONS; // (1+2+3) * 10

export type Round = {
	options: Record<Questions, Country[]>;
	currentQuestion: Questions;
	country: Country;
};

export type Game = {
	finished: boolean;
	score: number;
	currentRound: Rounds;
	rounds: Record<Rounds, Round>;
};
