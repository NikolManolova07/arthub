import React from "react";
import { useEffect, useState } from "react";
import { customAlertStyles } from "../../styles/styles";

interface AlertProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <div className={customAlertStyles.wrapper}>
            <div
                className={`
                    ${customAlertStyles.container}
                    ${customAlertStyles[type]}
                    transform transition-all duration-500 ease-out
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
                `}
            >
                <span className={customAlertStyles.message}>{message}</span>
                <button className={customAlertStyles.closeButton} onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Alert;
