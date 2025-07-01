import { AnswerCreateRequest, Question, QuestionAnswerRequest, QuestionCreateRequest, Quiz, QuizAttemptStart, QuizAttemptSubmit, QuizCreateRequest, QuizDetails, QuizResults } from "../types/types";
import API from "./axiosConfig";

export const createQuiz = async (quizData: QuizCreateRequest): Promise<Quiz> => {
    const response = await API.post<Quiz>("/quizzes/", quizData, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
};

export const createQuestion = async (questionData: QuestionCreateRequest): Promise<Question> => {
    const formData = new FormData();
    formData.append("quizId", questionData.quizId.toString());
    formData.append("questionContent", questionData.questionContent);

    if (questionData.image) {
        formData.append("image", questionData.image);
    }

    const response = await API.post<Question>("/questions/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
};

export const createAnswer = async (answerData: AnswerCreateRequest): Promise<Map<string, string>> => {
    const response = await API.post<Map<string, string>>("/answers/", answerData, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
};

export const getQuizzes = async (): Promise<Quiz[]> => {
    const response = await API.get<Quiz[]>("/quizzes/");

    return response.data;
};

export const getQuizById = async (quizId: number): Promise<QuizDetails> => {
    const response = await API.get<QuizDetails>(`/quizzes/${quizId}`);

    return response.data;
};

export const deleteQuiz = async (quizId: number): Promise<Map<string, string>> => {
    const response = await API.delete<Map<string, string>>(`/quizzes/${quizId}`);

    return response.data;
};

export const startQuiz = async (quizId: number): Promise<QuizAttemptStart> => {
    const response = await API.post<QuizAttemptStart>(`/quizzes/${quizId}/start`);

    return response.data;
};

export const submitQuiz = async (quizId: number, attemptId: number, questionAnswerData: QuestionAnswerRequest[]): Promise<QuizAttemptSubmit> => {
    const response = await API.post<QuizAttemptSubmit>(`/quizzes/${quizId}/attempts/${attemptId}/submit`, questionAnswerData, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
};

export const getTopQuizResults = async (): Promise<QuizResults[]> => {
    const response = await API.get<QuizResults[]>("/quizzes/results");

    return response.data;
};

export const getQuizzesByAdmin = async (): Promise<Quiz[]> => {
    const response = await API.get<Quiz[]>("/admin/quizzes/");

    return response.data;
};

export const deleteQuizByAdmin = async (quizId: number): Promise<Map<string, string>> => {
    const response = await API.delete<Map<string, string>>(`/admin/quizzes/${quizId}`);

    return response.data;
};
