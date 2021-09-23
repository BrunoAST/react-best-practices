import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Styles from "./survey-list.module.scss";
import { thumbDownIcon } from "../../../theme/assets/icons";

const SurveyList: React.FC = () => {
	return (
		<div className={Styles.surveyListWrapper}>
			<Header />
			<div className={Styles.contentWrapper}>
				<h2 className={Styles.contentWrapper__title}>Enquetes</h2>
				<ul className={Styles.contentWrapper__resultsList}>
					<li>
						<div className={Styles.surveyContent}>
							<div className={`${Styles.surveyContent__iconWrap} ${Styles.red}`}>
								<img src={thumbDownIcon} alt="Thumb down" />
							</div>
							<time>
								<span className={Styles.day}>20</span>
								<span className={Styles.month}>03</span>
								<span className={Styles.year}>2021</span>
							</time>
							<p>Qual é seu framework web favorito?</p>
						</div>
						<footer>
							Ver Resultado
						</footer>
					</li>
				</ul>
			</div>
			<Footer />
		</div>
	);
}

export default SurveyList;
