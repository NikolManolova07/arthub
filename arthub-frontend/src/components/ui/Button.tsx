import React from "react";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", className, disabled, icon }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${className} flex items-center justify-center`}
        >
            {icon && <span className="text-xl ml-2">{icon}</span>}
            {children && <span className="flex-1 px-2">{children}</span>}
        </button>
    );
};

export default Button;
