import React, { useEffect, useState } from "react";
import { SurveyModel } from "domain/models/survey-model";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SurveyItemEmpty from "./components/SurveyItemEmpty/SurveyItemEmpty";
import Styles from "./survey-list.module.scss";
import { SurveyListProps } from "./types/survey-list-props";
import SurveyItem from "./components/SurveyItem/SurveyItem";

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
				{
					state.error
						? <div>
							<span data-testid="error">{state.error}</span>
							<button>Recarregar</button>
						</div>
						:
						<ul className={Styles.contentWrapper__resultsList} data-testid="survey-list">
							{
								state.surveys.length
									? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
									: <SurveyItemEmpty />
							}
						</ul>
				}
			</div>
			<Footer />
		</div>
	);
};

export default SurveyList;
