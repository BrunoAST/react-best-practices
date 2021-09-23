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
							<div className={`${Styles.surveyContent__iconWrap} ${Styles.red}`}>
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA70lEQVQ4Ea2RPQoCQQyFZ/w5g72lYOEVPIiV2IkIHmCvIZ5D77BgZWtrYWe1ICiuL8tEwjIZZmYNZCf7knyTzRrjrK7rAfwAr+AheyNZwiei98gNrBkISxYjz5KbZb0V4gXxlN8jzo+1tk91BOT6nhPmOFNg1Nb0UiCNxY0Uu8QW044BuMIZHs3DJzcra3/yOgem3UoT3pEcaQUh3TchAX9/KNTsy/mAtLebrzhXI+AqE/oQl55ErIfYxp5WothW71QyAJ0VWKG06DJAQ/jTA0yH0TUAzf4Gc8BFC5g3GcHI3IQvBy0asesDsB08CfYFB/44kX6+Hj8AAAAASUVORK5CYII=" alt="Thumb down" />
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
