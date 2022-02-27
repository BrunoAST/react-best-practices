import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SurveyItemEmpty from "./components/SurveyItemEmpty/SurveyItemEmpty";
import Styles from "./survey-list.module.scss";

const SurveyList: React.FC = () => {
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
}

export default SurveyList;
