import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/ui/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import QuizCreatePage from "./pages/QuizCreatePage";
import QuizSolvePage from "./pages/QuizSolvePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import QuizResultsPage from "./pages/QuizResultsPage";
import QuizDetailsPage from "./pages/QuizDetailsPage";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/main"
                    element={
                        <ProtectedRoute>
                            <MainPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/create-quiz"
                    element={
                        <ProtectedRoute>
                            <QuizCreatePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/solve-quiz"
                    element={
                        <ProtectedRoute>
                            <QuizSolvePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/solve-quiz/:quizId"
                    element={
                        <ProtectedRoute>
                            <QuizDetailsPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/quiz-results"
                    element={
                        <ProtectedRoute>
                            <QuizResultsPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
}

export default App;
