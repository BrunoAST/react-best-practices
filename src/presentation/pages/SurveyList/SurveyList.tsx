import React from "react";
import Logo from "../../components/Logo/Logo";
import Footer from "../../components/Footer/Footer";
import Styles from "./survey-list.module.scss";

const SurveyList: React.FC = () => {
	return (
		<div className={Styles.surveyListWrapper}>
			<header className={Styles.headerWrapper}>
				<div className={Styles.headerWrapper__content}>
					<Logo />
					<div className={Styles.logoutWrapper}>
						<span>Rodrigo</span>
						<a href="#">Sair</a>
					</div>
				</div>
			</header>
			<div className={Styles.contentWrapper}>
				<h2 className={Styles.contentWrapper__title}>Enquetes</h2>
				<ul className={Styles.contentWrapper__resultsList}>
					<li>
						<div className={Styles.surveyContent}>
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
