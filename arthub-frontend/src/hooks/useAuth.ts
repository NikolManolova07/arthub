export const useAuth = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    
    // !! - Convert a value to a boolean. Will be true if token is not null or undefined.
    return { token, userId, role, isAuthenticated: !!token };
};
