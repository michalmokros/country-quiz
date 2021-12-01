import { useState } from 'react';

import myData from '../countryData.json';

export type Score = {
	score: number;
	maxScore: number;
};

export type Country = {
	short_name: string;
	long_name: string;
	capital_city: string;
	population: number;
};

const useGame = () => {
	const [question, setQuestion] = useState('flag');
	const [score, setScore] = useState<Score>({
		score: 0,
		maxScore: 0
	});
	// const [answers, setAnswers] = useState<Country[]>([]);

	// const countryInfoObjArr = myData.map(country => {
	// 		country.short_name,
	// 		country.long_name,
	// 		country.capital_city,
	// 		country.population
	// });

	/*eslint arrow-body-style: ["error", "always"]*/
	/*eslint-env es6*/
	const countryArr: Country[] = myData.map(country => {
		return {
			short_name: country.short_name,
			long_name: country.long_name,
			capital_city: country.capital_city,
			population: country.population
		};
	});

	console.log(countryArr[0]);

	const pickedCountries = countryArr
		.sort((a: Country, b: Country) => {
			return 0.5 - Math.random();
		})
		.splice(0, 10);

	const pickedCountry = pickedCountries[0];

	const wrongAnsvers = countryArr
		.filter(country => {
			return country !== pickedCountry;
		})
		.sort((a: Country, b: Country) => {
			return 0.5 - Math.random();
		})
		.splice(0, 3);
	console.log(pickedCountries);
	const answers: Country[] = [...wrongAnsvers, pickedCountry];

	const getQuestionText = (question: string) => {
		if (question === 'flag') return 'Pick the correct country';
		if (question === 'capital') return 'What is the capital city of ';
		if (question === 'population') return 'What is this flag';
	};

	const onButtonClick = () => {
		return 0;
	};

	return {
		score,
		text: getQuestionText(question),
		question,
		answers,
		onButtonClick
	};
};

export default useGame;
