import { homeStyles } from "../../styles/styles";
import { BACKGROUND_IMAGE } from "../../api/constants";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Button from "./Button";

function HomeContainer() {
    return (
        <div className={homeStyles.home}>
            <div className={homeStyles.panel}>
                <div
                    className={homeStyles.backgroundImage}
                    style={{
                        backgroundImage: `url(${BACKGROUND_IMAGE})`,
                    }}
                />

                <div className={homeStyles.overlayEffect} />

                <div id="top" className={homeStyles.collection}>
                    <h1 className={homeStyles.welcomeText}>Добре дошли в <span className="text-beige">Art</span>Hub!</h1>
                    <p className={homeStyles.paragraph}>Вашето приключение в света на история на изкуството започва тук и сега!</p>
                    <div className={homeStyles.group}>
                        <Button onClick={() => {
                            document.getElementById("learnMore")?.scrollIntoView({ behavior: "smooth" });
                        }}
                            className={homeStyles.leftButton}>
                            Научи повече
                        </Button>

                        <Button onClick={() => {
                            document.getElementById("info")?.scrollIntoView({ behavior: "smooth" });
                        }}
                            className={homeStyles.rightButton}>
                            Информация
                        </Button>
                    </div>
                </div>

                <section id="learnMore" className={homeStyles.learnMoreSection}>
                    <div className={homeStyles.sectionPanel}>
                        <h2 className={homeStyles.header}>Кои сме ние?</h2>
                        <p className={homeStyles.content}>
                            ArtHub е социална платформа за история на изкуството, насочена към специалисти, художници, ученици, студенти и любители на изобразителното изкуство.
                            Позволява на потребителите да споделят текстово и визуално съдържание, да взаимодействат помежду си и да участват в куизове в областта на история на изкуството.
                        </p>
                    </div>
                </section>

                <section id="info" className={homeStyles.infoSection}>
                    <div className={homeStyles.sectionPanel}>
                        <h2 className={homeStyles.header}>Функционалности</h2>
                        <p className={homeStyles.content}>
                            Като социална платформа за история на изкуството, ArtHub включва функционалности в следните три категории:
                        </p>

                        <div className={homeStyles.containerGroup}>
                            <div className={homeStyles.container}>
                                <h3 className={homeStyles.title}>ПОТРЕБИТЕЛИ</h3>
                                <ul className={homeStyles.list}>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Регистрация и логин
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Последване на потребители
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Преглед и реакция на постове
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Преглед и решаване на куизове
                                    </li>
                                </ul>
                            </div>

                            <div className={homeStyles.container}>
                                <h3 className={homeStyles.title}>КУИЗОВЕ</h3>
                                <ul className={homeStyles.list}>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Създаване на куизове
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Задаване на нива на трудност
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Въпроси и отговори
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Решаване на куизове за време
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Статистика на резултатите
                                    </li>
                                </ul>
                            </div>

                            <div className={homeStyles.container}>
                                <h3 className={homeStyles.title}>ПОСТОВЕ</h3>
                                <ul className={homeStyles.list}>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Създаване на постове
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Задаване на стилова категория
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Харесване и коментиране
                                    </li>
                                    <li className={homeStyles.item}>
                                        <IoIosCheckmarkCircle size={24} className={homeStyles.icon} />
                                        Филтриране на база стил
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={homeStyles.bottomSection}>
                    <div className={homeStyles.bottomPanel}>
                        <Button onClick={() => {
                            document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
                        }}
                            className={homeStyles.topButton}>
                            Нагоре
                        </Button>
                    </div>
                </section>

                <footer className={homeStyles.footer}>
                    &copy; {new Date().getFullYear()} ArtHub. Всички права запазени.
                </footer>
            </div>
        </div>
    );
};

export default HomeContainer;
