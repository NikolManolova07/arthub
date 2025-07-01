// Users.
export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl?: string;
    role: "ADMIN" | "USER";
};

export interface UserDetails extends User {
    followersCount: number;
    followingCount: number;
    createdQuizzesCount: number;
    followers: User[];
    following: User[];
    createdQuizzes: QuizCreated[];
};

export interface Leaderboard {
    user: User;
    totalScore: number;
};

export interface TopUser {
    user: User;
    startTime: string; // string (ISO 8601)
    endTime: string; // string (ISO 8601)
    score: number;
};

// Posts.
export interface Category {
    id: number;
    name: string;
    description?: string;
};

export interface Comment {
    id: number;
    createdBy: User;
    comment: string;
    createdAt: string; // string (ISO 8601)
};

export interface Post {
    id: number;
    createdBy: User;
    category: Category;
    createdAt: string; // string (ISO 8601)
    likesCount: number;
    commentsCount: number;
};

export interface PostDetails extends Post {
    postContent: string;
    imageUrl?: string;
    likedByLoggedInUser: boolean;
    comments: Comment[];
};

// Quizzes.
export interface Answer {
    id: number;
    answerContent: string;
};

export interface Question {
    id: number;
    questionContent: string;
    imageUrl?: string;
    answers: Answer[];
};

export interface QuizCreated {
    id: number;
    title: string;
    description?: string;
    duration: number;
    level: "EASY" | "MEDIUM" | "HARD";
    questionsCount: number;
};

export interface Quiz {
    id: number;
    createdBy: User;
    title: string;
    description?: string;
    duration: number;
    level: "EASY" | "MEDIUM" | "HARD";
    questionsCount: number;
};

export interface QuizDetails extends Quiz {
    questions: Question[];
};

export interface QuizResults {
    quizId: number;
    quizName: string;
    topUsers: TopUser[]
};

// Quiz Attempts.
export interface QuizAttemptStart {
    id: number;
    quizDetails: QuizDetails;
    user: User;
    startTime: string; // string (ISO 8601)
    status: "COMPLETED" | "IN_PROGRESS";
};

export interface QuizAttemptSubmit extends QuizAttemptStart {
    endTime: string; // string (ISO 8601)
    score: number;
};

// Login & Logout Response.
export interface LoginResponse extends User {
    message: string;
    token: string;
};

export interface LogoutResponse {
    message: string;
};

// Form Register & Form Login Request.
export interface FormRegisterRequest {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export interface FormLoginRequest {
    username: string;
    password: string;
};

// User Update Request.
export interface UserUpdateRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: File;
};

// Post Create Request.
export interface PostCreateRequest {
    categoryId: number;
    postContent: string;
    image?: File;
};

// Category Create Request.
export interface CategoryCreateRequest {
    name: string;
    description?: string;
};

// Comment Create Request.
export interface CommentCreateRequest {
    comment: string;
};

// Quiz Create Request.
export interface QuizCreateRequest {
    title: string;
    duration: number;
    level: "DEFAULT" | "EASY" | "MEDIUM" | "HARD";
    description?: string;
};

// Question Create Request.
export interface QuestionCreateRequest {
    quizId: number;
    questionContent: string;
    image?: File;
};

// Answer Create Request.
export interface AnswerCreateRequest {
    questionId: number;
    answerContent: string;
    isCorrect: boolean;
};

// Form Answer Request.
export interface FormAnswerRequest {
    answers: { answerContent: string }[];
    correctAnswerIndex: number;
};

// Question Answer Request.
export interface QuestionAnswerRequest {
    questionId: number;
    answerId: number;
};
