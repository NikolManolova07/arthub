import { useState } from "react";
import { Question, Quiz } from "../../types/types";
import { sidebarStyles } from "../../styles/styles";
import Button from "./Button";
import QuizCreateModal from "../quiz/QuizCreateModal";
import QuestionCreateModal from "../quiz/QuestionCreateModal";

interface QuizSidebarProps {
    onQuizCreated: (newQuiz: Quiz) => void;
    onQuestionCreated: (newQuestion: Question) => void;
}

function QuizSidebar({ onQuizCreated, onQuestionCreated }: QuizSidebarProps) {
    const [isQuizCreateModalOpen, setQuizCreateModalOpen] = useState(false);
    const [isQuestionCreateModalOpen, setQuestionCreateModalOpen] = useState(false);
    
    return (
        <aside className={sidebarStyles.sidebar}>
            <div className={sidebarStyles.container}>
                <div className={sidebarStyles.group}>
                    <h3 className={sidebarStyles.title}>КУИЗОВЕ</h3>
                    <Button onClick={() => setQuizCreateModalOpen(true)} className={sidebarStyles.createButton}>
                        Създай куиз
                    </Button>
                </div>
            </div>

            <div className={sidebarStyles.container}>
                <div className={sidebarStyles.group}>
                    <h3 className={sidebarStyles.title}>ВЪПРОСИ</h3>
                    <Button onClick={() => setQuestionCreateModalOpen(true)} className={sidebarStyles.createButton}>
                        Създай въпрос
                    </Button>
                </div>
            </div>

            {isQuizCreateModalOpen && <QuizCreateModal onQuizCreated={onQuizCreated} onClose={() => setQuizCreateModalOpen(false)} />}
            {isQuestionCreateModalOpen && <QuestionCreateModal onQuestionCreated={onQuestionCreated} onClose={() => setQuestionCreateModalOpen(false)} />}        </aside>
    );
};

export default QuizSidebar;
