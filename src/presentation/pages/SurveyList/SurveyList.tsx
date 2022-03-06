import React, { useEffect, useState } from "react";
import { SurveyModel } from "domain/models/survey-model";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Styles from "./survey-list.module.scss";
import { SurveyListProps } from "./types/survey-list-props";
import SurveyListContext from "./context/survey-list-context";
import SurveyListOptions from "./components/SurveyListOptions/SurveyListOptions";
import SurveyError from "./components/SurveyError/SurveyError";

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }: SurveyListProps) => {
	const [state, setState] = useState({
		surveys: [] as SurveyModel[],
		error: ""
	});

	useEffect(() => {
		loadSurveyList.loadAll()
			.then((surveys: SurveyModel[]) => setState({ ...state, surveys }))
			.catch(error => setState({ ...state, error: error.message }));
	}, []);

	return (
		<div className={Styles.surveyListWrapper}>
			<Header />
			<div className={Styles.contentWrapper}>
				<h2 className={Styles.contentWrapper__title}>Enquetes</h2>
				<SurveyListContext.Provider value={{ state, setState }}>
					{state.error ? <SurveyError /> : <SurveyListOptions />}
				</SurveyListContext.Provider>
			</div>
			<Footer />
		</div>
	);
};

export default SurveyList;
