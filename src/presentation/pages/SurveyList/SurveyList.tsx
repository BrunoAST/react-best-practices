import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SurveyItemEmpty from "./components/SurveyItemEmpty/SurveyItemEmpty";
import Styles from "./survey-list.module.scss";
import { SurveyListProps } from "./types/survey-list-props";

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }: SurveyListProps) => {
	useEffect(() => {
		(async function () {
			loadSurveyList.loadAll();
		})();
	}, []);

	return (
		<div className={Styles.surveyListWrapper}>
			<Header />
			<div className={Styles.contentWrapper}>
				<h2 className={Styles.contentWrapper__title}>Enquetes</h2>
				<ul className={Styles.contentWrapper__resultsList} data-testid="survey-list">
					<SurveyItemEmpty />
				</ul>
			</div>
			<Footer />
		</div>
	);
};

export default SurveyList;
