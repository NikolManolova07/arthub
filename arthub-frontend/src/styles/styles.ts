export const adminContainerStyles = {
    // Layout and Structure.
    main: "flex items-start justify-center bg-gray-100 gap-4 overflow-hidden max-h-screen",

    // Panel Layouts.
    leftPanel: "w-full sm:w-[calc(24.65%)]",
    rightPanel: "w-full sm:w-[calc(75%)] overflow-auto mt-16 pb-6 pl-2 pr-6 h-screen hide-scrollbar",
    container: "w-full max-h-[85vh] p-8 bg-white rounded-2xl shadow-md mt-6",

    // Header.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-[300px] mx-auto",
    userHeaderRow: "grid grid-cols-6 gap-4 justify-items-center items-center text-center text-sm font-semibold text-dark-bluish-gray border-b-3 border-light-gray pb-2",
    postHeaderRow: "grid grid-cols-7 gap-4 justify-items-center items-center text-center text-sm font-semibold text-dark-bluish-gray border-b-3 border-light-gray pb-2",
    quizHeaderRow: "grid grid-cols-8 gap-4 justify-items-center items-center text-center text-sm font-semibold text-dark-bluish-gray border-b-3 border-light-gray pb-2",
    categoryHeaderRow: "grid grid-cols-4 gap-4 justify-items-center items-center text-center text-sm font-semibold text-dark-bluish-gray border-b-3 border-light-gray pb-2",
    paragraph: "text-gray-500 text-center",

    // Card and Content.
    section: "overflow-y-auto max-h-[55vh] hide-scrollbar",
    card: "border-b border-light-gray py-3 transition hover:bg-gray-100",
    userTable: "grid grid-cols-6 gap-4 justify-items-center items-center text-center my-2 w-full text-dark-bluish-gray",
    postTable: "grid grid-cols-7 gap-4 justify-items-center items-center text-center my-2 w-full text-dark-bluish-gray",
    quizTable: "grid grid-cols-8 gap-4 justify-items-center items-center text-center my-2 w-full text-dark-bluish-gray",
    categoryTable: "grid grid-cols-4 gap-4 justify-items-center items-center text-center my-2 w-full text-dark-bluish-gray",
    number: "flex items-center justify-center flex-shrink-0 bg-gray-200 font-semibold text-dark-bluish-gray w-6 h-6 rounded-full",
    quizTitle: "font-semibold text-dark-beige",
    categoryTitle: "font-semibold text-dark-beige",
    description: "text-sm",
    level: "font-bold",

    // User.
    createdBy: "flex py-2",
    user: "flex items-center text-left",
    profileImage: "w-12 h-12 rounded-full mr-2",
    group: "flex flex-col text-dark-bluish-gray font-semibold text-sm",
    username: "text-gray-400 font-normal",

    // Action Buttons (Delete, Promote and Create).
    deleteButton: "w-full bg-white text-gray-400 text-sm font-semibold p-1 mt-2 rounded-xl border-shadow transition hover:text-red-400 hover:cursor-pointer",
    promoteButton: "w-30 bg-beige text-white font-semibold p-2 rounded-2xl shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    createButton: "w-1/4 bg-beige text-white font-semibold mb-5 p-2 rounded-2xl shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Styling for Even and Odd Rows.
    evenRow: "bg-white",
    oddRow: "bg-gray-50",
};

export const answerModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "w-2xl bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-3 transform transition-transform duration-500 ease-out opacity-0",

    // Header.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-1/2 mx-auto",

    // Form Inputs and Selection.
    collection: "flex items-center justify-center gap-4 mb-3",
    answerContent: "w-[300px] h-[40px] mb-3 p-3 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",
    correctAnswer: "text-sm text-gray-700 ml-2",
    group: "flex flex-row items-center mb-3 mr-2",
    items: "flex flex-row justify-center",

    // Action Button.
    createButton: "w-55 bg-beige text-white font-semibold p-2 rounded-2xl mt-5 shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    answerErrorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-3 text-center",
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
};

export const baseStyles = {
    // Layout and Structure.
    background: "flex items-center justify-center bg-gray-100 pt-6 min-h-screen",
    main: "flex items-start justify-center bg-gray-100 gap-4 overflow-hidden max-h-screen",

    // Panel Layouts.
    leftPanel: "w-full sm:w-[calc(25%)]",
    middlePanel: "w-full sm:w-[calc(45%)] overflow-auto mt-16 pt-6 pb-6 px-2 max-h-[91vh] hide-scrollbar",
    rightPanel: "w-full sm:w-[calc(30%)]",
};

export const categoryModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "bg-white p-6 rounded-2xl shadow-md w-2xl space-y-3 transform transition-transform duration-500 ease-out opacity-0",

    // Header.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-1/2 mx-auto",

    // Form Inputs and Selection.
    label: "block text-sm font-medium text-gray-700 mb-4",
    categoryTitle: "w-full h-[40px] mb-5 p-3 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",
    textArea: "w-full h-25 mb-5 p-3 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",
    collection: "flex flex-row space-x-10",
    group: "flex flex-row items-center space-x-4",
    duration: "w-[80px] h-[40px] border-2 border-gray-300 p-1 rounded-lg mb-4 hover:cursor-pointer transition focus:ring-1 focus:ring-light-beige outline-none",
    selection: "w-[200px] border-2 border-gray-300 p-1 rounded-lg mb-4 hover:cursor-pointer selection",
    items: "flex flex-row space-x-60",

    // Action Buttons (Create and Cancel).
    createButton: "w-55 bg-beige text-white font-semibold p-2 rounded-2xl mt-5 shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    cancelButton: "w-55 bg-light-bluish-gray text-white font-semibold p-2 rounded-2xl mt-5 shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
};

export const categoryStyles = {
    // Layout and Structure.
    collection: "flex flex-wrap gap-4 justify-center mb-6",

    // Action Buttons (Category and More).
    categoryButton: "px-6 py-2 bg-light-gray text-dark-bluish-gray text-sm font-semibold rounded-2xl shadow-md transition hover:bg-dark-bluish-gray hover:text-white hover:cursor-pointer hover:shadow-lg",
    moreButton: "px-6 py-2 bg-white text-light-bluish-gray border-2 border-light-bluish-gray text-sm font-semibold rounded-2xl transition hover:bg-light-bluish-gray hover:text-white hover:cursor-pointer hover:shadow-lg",

    // Active Category State.
    selectedCategory: "bg-dark-bluish-gray text-white",
};

export const commentModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "bg-white p-6 rounded-2xl shadow-md w-2xl space-y-3 transform transition-transform duration-500 ease-out opacity-0",

    // Header.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-1/2 mx-auto",

    // Comments Section and Individual Comment Layout.
    commentsSection: "overflow-y-auto max-h-[35vh] hide-scrollbar",
    comment: "flex border-b border-light-gray py-3",
    commentUser: "flex space-x-10 mb-5",
    profileImage: "w-12 h-12 rounded-full mr-3",
    group: "text-dark-bluish-gray font-semibold flex flex-col",
    date: "text-gray-400 font-normal text-sm",
    body: "bg-gray-200 font-normal text-dark-bluish-gray p-3 rounded-lg mt-3",

    // Comment Deletion.
    commentDelete: "flex-1 relative",
    deleteButton: "absolute right-0 w-30 bg-white text-gray-400 text-sm font-semibold p-1 mt-1 mr-1 rounded-xl border-shadow transition hover:text-red-400 hover:cursor-pointer",

    // Comment Form Layout.
    commentForm: "flex flex-col mt-6",
    textArea: "w-full h-17 p-3 mb-4 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",
    items: "flex flex-row space-x-60",

    // Action Buttons (Create and Cancel).
    createButton: "w-55 bg-beige text-white font-semibold p-2 rounded-2xl mt-5 shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    cancelButton: "w-55 bg-light-bluish-gray text-white font-semibold p-2 rounded-2xl mt-5 shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center w-1/2 mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
};

export const customAlertStyles = {
    // Layout and Structure.
    wrapper: "fixed top-30 right-20 z-50",
    container: "w-[360px] p-4 rounded-2xl shadow-md flex items-center justify-between space-x-4 transition-all duration-300",

    // Types.
    success: "bg-green-100 text-green-700 border-l-4 border-green-400",
    error: "bg-red-100 text-red-700 border-l-4 border-red-400",

    // Messages.
    message: "flex-1 text-sm font-medium",
    closeButton: "text-xl font-bold cursor-pointer hover:opacity-80",
};

export const formStyles = {
    // Layout and Structure.
    container: "bg-white p-8 mt-6 rounded-2xl shadow-md w-96",
    title: "text-3xl font-bold text-dark-bluish-gray mb-6 text-center",

    // Form Fields.
    fields: "space-y-5",
    input: "w-full p-2 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none",

    // Action Button.
    button: "w-full bg-beige text-white font-semibold p-2 rounded-2xl mt-6 shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Text and Paragraphs.
    paragraph: "text-sm text-brown mt-4 text-center",

    // Links.
    link: "text-dark-beige hover:underline",

    // Message Styles.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",
    successMessage: "text-sm text-green-500 bg-green-100 p-2 rounded-md mb-6 text-center mx-auto",
};

export const homeStyles = {
    // Layout and Structure.
    home: "w-full hide-scrollbar overflow-auto scroll-smooth",
    panel: "relative h-screen w-full",
    backgroundImage: "absolute inset-0 bg-cover bg-center",
    overlayEffect: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent",
    collection: "relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4",
    welcomeText: "text-4xl md:text-6xl font-bold mb-10",
    paragraph: "text-lg md:text-xl mb-6",
    group: "flex gap-4",

    // Button Styling.
    leftButton: "w-[200px] bg-light-bluish-gray text-white font-semibold p-2 rounded-2xl shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    rightButton: "w-[200px] bg-transparent border-2 border-white font-semibold p-2 rounded-2xl shadow-md transition hover:bg-white hover:cursor-pointer hover:text-light-bluish-gray hover:translate-y-[-0.25rem] hover:shadow-lg",
    topButton: "w-[200px] bg-beige text-white font-semibold p-2 rounded-2xl shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Sections.
    learnMoreSection: "bg-white py-20 px-4 sm:px-8",
    infoSection: "bg-gray-100 py-20 px-4 sm:px-8",
    sectionPanel: "max-w-5xl mx-auto text-center",
    bottomSection: "bg-white py-10 px-4 sm:px-8",
    bottomPanel: "flex justify-center items-center",

    // Headers and Content.
    header: "text-3xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-4 w-[300px] mx-auto",
    content: "text-gray-700 font-normal text-lg",
    containerGroup: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6",
    container: "w-full p-6 bg-white rounded-2xl shadow-md hover:shadow-lg",
    title: "text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-2/3 mx-auto",
    list: "space-y-2 text-gray-600",
    item: "flex items-center gap-2",
    icon: "text-beige",

    // Footer.
    footer: "bg-dark-brown text-white py-4 text-center",
};

export const navbarStyles = {
    // Layout and Structure.
    navbar: "fixed top-0 left-0 w-full bg-dark-brown text-white font-semibold p-4 z-50",
    container: "mx-auto flex justify-between items-center px-6",

    // Text Styling.
    homeText: "text-2xl font-bold",
    helloMessage: "font-normal",

    // Navbar Items and Links.
    items: "flex space-x-6 items-center",
    link: "hover:text-gray-300",
    adminLink: "text-beige hover:text-dark-beige",

    // Button Styling.
    button: "w-32 bg-beige text-white font-semibold p-1 rounded-2xl transition hover:bg-dark-beige hover:cursor-pointer",
};

export const postFeedStyles = {
    // Layout and Structure.
    container: "w-full p-6 bg-white rounded-2xl shadow-md",
    title: "text-xl font-bold text-brown mb-5 text-center border-b-3 border-light-gray pb-2 w-1/2 mx-auto",
    paragraph: "text-gray-500 text-center",

    // Post Card and Content.
    postCard: "border-2 border-light-gray p-6 rounded-2xl mb-6 bg-white",
    postUser: "flex items-center mb-2 text-dark-bluish-gray",
    profileImage: "w-12 h-12 rounded-full mr-3",
    postGroup: "font-semibold flex flex-col mb-2",
    postDate: "text-gray-400 font-normal text-sm",
    postContent: "text-gray-700 mt-2",
    postImage: "object-cover mt-4 rounded-lg",

    // Buttons.
    buttonGroup: "flex justify-between items-center mt-4 gap-4",
    button: "w-full bg-white text-gray-400 text-sm font-semibold p-1 mt-2 rounded-xl border-shadow transition hover:text-dark-bluish-gray hover:cursor-pointer",
    likedButton: "w-full bg-white text-dark-bluish-gray text-sm font-semibold p-1 mt-2 rounded-xl border-shadow hover:cursor-pointer",
    deleteButton: "w-full bg-white text-gray-400 text-sm font-semibold p-1 mt-2 rounded-xl border-shadow transition hover:text-red-400 hover:cursor-pointer",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",
};

export const postModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "w-4xl bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-3 transform transition-transform duration-500 ease-out opacity-0",

    // Header.
    title: "w-full flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2",

    // Layout for Columns and Items.
    columns: "flex flex-col md:flex-row space-x-10",
    items: "flex flex-row space-x-7",

    // Form Inputs and Selection.
    label: "block text-sm font-medium text-gray-700 mb-4",
    selection: "w-full border-2 border-gray-300 p-1 rounded-lg mb-5 hover:cursor-pointer selection",
    textArea: "w-full h-27 mb-5 p-3 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",

    // Image Upload Section.
    uploadLabel: "text-center w-47 p-2 rounded-lg border-2 border-gray-300 hover:cursor-pointer",
    imageContainer: "w-full h-[410px] rounded-lg border-2 border-gray-300 flex justify-center items-center p-8",
    image: "max-w-full max-h-full object-contain rounded-md",
    clearButton: "text-center w-47 p-2 rounded-lg border-2 border-red-400 transition hover:bg-red-400 hover:text-white hover:cursor-pointer",

    // Action Buttons (Create and Cancel).
    createButton: "w-47 bg-beige text-white font-semibold p-2 rounded-2xl mt-10 shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    cancelButton: "w-47 bg-light-bluish-gray text-white font-semibold p-2 rounded-2xl mt-10 shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
};

export const questionModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "w-4xl bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-3 transform transition-transform duration-500 ease-out opacity-0",

    // Header.
    title: "w-full flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2",

    // Layout for Columns and Items.
    columns: "flex flex-col md:flex-row space-x-10",
    items: "flex flex-row space-x-7",

    // Form Inputs and Selection.
    label: "block text-sm font-medium text-gray-700 mb-4",
    selection: "w-full border-2 border-gray-300 p-1 rounded-lg mb-5 hover:cursor-pointer selection",
    textArea: "w-full h-20 mb-5 p-3 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",

    // Image Upload Section.
    uploadLabel: "text-center w-47 p-2 rounded-lg border-2 border-gray-300 hover:cursor-pointer",
    imageContainer: "w-full h-[370px] rounded-lg border-2 border-gray-300 flex justify-center items-center p-8",
    image: "max-w-full max-h-full object-contain rounded-md",
    clearButton: "text-center w-47 p-2 rounded-lg border-2 border-red-400 transition hover:bg-red-400 hover:text-white hover:cursor-pointer",

    // Action Buttons (Create and Cancel).
    createButton: "w-47 bg-beige text-white font-semibold p-2 rounded-2xl mt-10 shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    cancelButton: "w-47 bg-light-bluish-gray text-white font-semibold p-2 rounded-2xl mt-10 shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
};

export const quizContainerStyles = {
    // Layout and Structure.
    main: "flex items-start justify-center bg-gray-100 gap-4 overflow-hidden max-h-screen",

    // Panel Layouts.
    leftPanel: "w-full sm:w-[calc(24.65%)]",
    rightPanel: "w-full sm:w-[calc(75%)] overflow-auto mt-16 pb-6 pl-2 pr-6 h-screen hide-scrollbar",
    mainPanel: "w-full overflow-auto mt-16 pl-6 pr-6 h-screen hide-scrollbar",
    container: "w-full max-h-[85vh] p-8 bg-white rounded-2xl shadow-md mt-6",

    // Header.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-[300px] mx-auto",
    quizCreateHeaderRow: "grid grid-cols-7 gap-4 justify-items-center items-center text-center text-sm font-semibold text-dark-bluish-gray border-b-3 border-light-gray pb-2",
    quizSolveHeaderRow: "grid grid-cols-8 gap-4 justify-items-center items-center text-center text-sm font-semibold text-dark-bluish-gray border-b-3 border-light-gray pb-2",
    paragraph: "text-gray-500 text-center",

    // Quiz Card and Content.
    quizzesSection: "overflow-y-auto max-h-[65vh] hide-scrollbar",
    quizCard: "border-b border-light-gray py-3 transition hover:bg-gray-100",
    quizCreateTable: "grid grid-cols-7 gap-4 justify-items-center items-center text-center my-2 w-full text-dark-bluish-gray",
    quizSolveTable: "grid grid-cols-8 gap-4 justify-items-center items-center text-center my-2 w-full text-dark-bluish-gray",
    number: "flex items-center justify-center flex-shrink-0 bg-gray-200 font-semibold text-dark-bluish-gray w-6 h-6 rounded-full",
    quizTitle: "font-semibold text-dark-beige",
    description: "text-sm",
    level: "font-bold",

    // User.
    createdBy: "flex py-2",
    user: "flex items-center text-left",
    profileImage: "w-12 h-12 rounded-full mr-2",
    group: "flex flex-col text-dark-bluish-gray font-semibold text-sm",
    username: "text-gray-400 font-normal",

    // Action Buttons (Delete and Solve).
    deleteButton: "w-full bg-white text-gray-400 text-sm font-semibold p-1 mt-2 rounded-xl border-shadow transition hover:text-red-400 hover:cursor-pointer",
    solveButton: "w-30 bg-beige text-white font-semibold p-2 rounded-2xl shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Styling for Even and Odd Rows.
    evenRow: "bg-white",
    oddRow: "bg-gray-50",
};

export const quizModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "bg-white p-6 rounded-2xl shadow-md w-2xl space-y-3 transform transition-transform duration-500 ease-out opacity-0",

    // Header.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-1/2 mx-auto",

    // Form Inputs and Selection.
    label: "block text-sm font-medium text-gray-700 mb-4",
    quizTitle: "w-full h-[40px] mb-5 p-3 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",
    textArea: "w-full h-25 mb-5 p-3 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",
    collection: "flex flex-row space-x-10",
    group: "flex flex-row items-center space-x-4",
    duration: "w-[80px] h-[40px] border-2 border-gray-300 p-1 rounded-lg mb-4 hover:cursor-pointer transition focus:ring-1 focus:ring-light-beige outline-none",
    selection: "w-[200px] border-2 border-gray-300 p-1 rounded-lg mb-4 hover:cursor-pointer selection",
    items: "flex flex-row space-x-60",

    // Action Buttons (Create and Cancel).
    createButton: "w-55 bg-beige text-white font-semibold p-2 rounded-2xl mt-5 shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    cancelButton: "w-55 bg-light-bluish-gray text-white font-semibold p-2 rounded-2xl mt-5 shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
};

export const quizSolveContainerStyles = {
    // Layout and Structure.
    main: "flex items-start justify-center bg-gray-100 gap-4 overflow-hidden max-h-screen",

    // Panel Layouts.
    mainPanel: "w-full overflow-auto mt-16 pl-6 pr-6 h-screen hide-scrollbar",
    container: "w-full max-h-[85vh] p-8 bg-white rounded-2xl shadow-md mt-6",

    // Header and Subtitles.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-[300px] mx-auto",
    paragraph: "text-gray-500 text-center",

    // Question Card and Content.
    questionTitleGroup: "flex flex-row items-center mt-3 mb-6",
    questionBodyGroup: "flex flex-row",
    number: "flex items-center justify-center flex-shrink-0 bg-gray-200 font-semibold text-dark-bluish-gray w-6 h-6 rounded-full mr-4",
    subtitleQuestion: "text-lg font-semibold text-dark-bluish-gray",
    imageContainer: "w-2/3 h-[400px] rounded-lg border-2 border-gray-300 flex justify-center items-center mr-6 p-6",
    image: "max-w-full max-h-full object-contain rounded-md",
    answersGroup: "flex flex-col space-y-5",
    answer: "flex items-center space-x-5 border-2 border-gray-300 bg-white text-gray-700 font-semibold p-2 pr-5 rounded-xl shadow-md transition hover:bg-gray-100 hover:cursor-pointer hover:shadow-lg",

    // Action Buttons (Next and Submit).
    nextButton: "w-55 bg-light-beige text-white font-semibold p-2 rounded-2xl mt-5 disabled:bg-gray-300 transition hover:bg-beige hover:cursor-pointer",
    submitButton: "w-55 bg-beige text-white font-semibold p-2 rounded-2xl mt-5 disabled:bg-gray-300 transition hover:bg-dark-beige hover:cursor-pointer",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",
};

export const quizResultsContainerStyles = {
    // Layout and Structure.
    main: "flex justify-center bg-gray-100 gap-4 overflow-hidden max-h-screen",
    mainPanel: "w-full overflow-auto mt-16 pl-6 pr-6 h-screen hide-scrollbar",
    container: "flex flex-col justify-center w-[75%] max-h-[85vh] p-6 bg-white rounded-2xl shadow-md mt-6 mx-auto",

    // Header.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-[300px] mx-auto",
    subtitle: "flex-1 texl-lg font-semibold text-gray-700 text-center border-2 border-light-beige bg-white p-2 mb-5 rounded-xl w-1/3 mx-auto",
    quizHeaderRow: "grid grid-cols-5 gap-4 justify-items-center items-center text-center text-sm font-semibold text-dark-bluish-gray border-b-3 border-light-gray pb-2",
    paragraph: "text-gray-500 text-center",

    // Quiz Card and Content.
    quizzesSection: "overflow-y-auto max-h-[75vh] hide-scrollbar",
    quiz: "border-2 border-light-gray p-6 rounded-2xl mb-6 bg-white",
    quizCard: "border-b border-light-gray py-3 transition hover:bg-gray-100",
    quizResultsTable: "grid grid-cols-5 gap-4 justify-items-center items-center text-center my-2 w-full text-dark-bluish-gray",
    rank: "flex items-center justify-center flex-shrink-0 bg-gray-200 font-semibold text-dark-bluish-gray w-6 h-6 rounded-full",
    totalScore: "text-dark-bluish-gray font-bold",

    // User.
    solvedBy: "flex py-2",
    user: "flex items-center text-left",
    profileImage: "w-12 h-12 rounded-full mr-3",
    group: "flex flex-col text-dark-bluish-gray font-semibold",
    username: "text-gray-400 font-normal text-sm",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Styling for Even and Odd Rows.
    evenRow: "bg-white",
    oddRow: "bg-gray-50",
};

export const sidebarStyles = {
    // Layout and Structure.
    sidebar: "w-full p-6 h-screen shadow-md mt-10",
    container: "w-full p-8 bg-white rounded-2xl shadow-md mt-6",

    // Title and Grouping.
    title: "text-xl font-bold text-brown mb-5 text-center border-b-3 border-light-gray pb-2 mx-auto",
    group: "flex flex-col items-center",
    items: "flex flex-col space-y-4 text-center w-full",

    // Action Buttons (Create and Solve).
    createButton: "w-full bg-light-bluish-gray text-white font-semibold p-2 rounded-2xl shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    solveButton: "w-full bg-beige text-white font-semibold p-2 rounded-2xl shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
};

export const statisticsStyles = {
    // Layout and Structure.
    container: "w-full bg-white p-8 rounded-2xl shadow-md mt-6",
    statistics: "w-full p-6 h-screen shadow-md mt-10",

    // Flexbox and Positioning.
    group: "flex flex-col items-center",
    headerRow: "flex justify-between text-center text-sm font-semibold text-dark-bluish-gray border-b-3 border-light-gray px-3 pb-2",

    // Typography.
    title: "text-xl font-bold text-brown text-center border-b-3 border-light-gray pb-2 mx-auto mb-5",
    paragraph: "text-gray-500 text-center",
    username: "text-gray-400 font-normal text-sm",
    totalScore: "text-dark-bluish-gray font-bold ml-auto",
    userGroup: "flex flex-col text-dark-bluish-gray font-semibold",

    // User Card and Content.
    usersSection: "overflow-y-auto max-h-[25vh] hide-scrollbar",
    userCard: "flex border-b border-light-gray font-semibold p-3 hover:bg-gray-100",
    user: "flex items-center space-x-8 my-2 w-full",
    rank: "flex items-center justify-center flex-shrink-0 bg-gray-200 font-semibold text-dark-bluish-gray w-6 h-6 rounded-full",
    profileImage: "w-12 h-12 rounded-full mr-3",
    userDetails: "flex items-center justify-center space-x-8 w-full",

    // Buttons.
    statisticsButton: "w-2/3 bg-light-bluish-gray text-white font-semibold p-2 mt-5 rounded-2xl shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    userDetailsButton: "w-1/3 bg-beige text-white font-semibold p-2 rounded-2xl shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-5 text-center w-full mx-auto",

    // Styling for Even and Odd Rows.
    evenRow: "bg-white",
    oddRow: "bg-gray-50",
};

export const userDetailsModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "bg-white p-6 rounded-2xl shadow-md w-2xl space-y-3 transform transition-transform duration-500 ease-out opacity-0",

    // Header and Subtitles.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-1/2 mx-auto mb-5",
    subtitleFollowers: "flex-1 text-md font-bold text-light-bluish-gray text-center border-b-3 border-light-gray pb-2 w-1/4 mx-auto mb-5",
    subtitleFollowings: "flex-1 text-md font-bold text-beige mt-5 text-center border-b-3 border-light-gray pb-2 w-1/4 mx-auto mb-5",
    paragraph: "text-gray-500 text-center",

    // Users Section and Individual User Layout.
    usersSection: "flex flex-wrap gap-4 justify-center overflow-y-auto max-h-[20vh] hide-scrollbar",
    follower: "flex flex-col py-2 w-1/4 sm:w-auto",
    following: "flex flex-col py-2 w-1/4 sm:w-auto",
    user: "flex mx-2",
    profileImage: "w-12 h-12 rounded-full mr-3",
    group: "text-dark-bluish-gray font-semibold flex flex-col",
    username: "text-gray-400 font-normal text-sm",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center w-1/2 mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
}

export const userModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "w-2xl bg-white p-6 rounded-2xl shadow-md space-y-3 transform transition-transform duration-500 ease-out opacity-0",
    title: "text-xl font-bold text-brown mb-5 text-center border-b-3 border-light-gray pb-2 w-1/2 mx-auto",
    paragraph: "text-gray-500 text-center",

    // Users Section and Search.
    usersSection: "overflow-y-auto max-h-[50vh] hide-scrollbar",
    search: "w-full border-2 border-gray-300 p-2 mb-5 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none",

    // User List and Individual User Layout.
    user: "flex justify-between border-b border-light-gray py-5",
    userDetails: "flex items-center space-x-4 text-dark-bluish-gray font-semibold",
    profileImage: "w-12 h-12 rounded-full mr-5",

    // Follow/Unfollow Buttons.
    userFollow: "flex items-center justify-end",
    followButton: "w-35 bg-beige text-white font-semibold p-2 rounded-2xl transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-md",
    unfollowButton: "w-35 bg-white text-beige border-2 border-beige font-semibold p-2 rounded-2xl transition hover:bg-beige hover:text-white hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-md",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mt-6 text-center w-1/2 mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
};

export const userUpdateModalStyles = {
    // Layout and Structure.
    background: "fixed inset-0 backdrop-brightness-60 flex justify-center items-center",
    container: "w-4xl bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-3 transform transition-transform duration-500 ease-out opacity-0",

    // Header.
    title: "w-full flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2",
    paragraph: "text-gray-500 text-center",

    // Layout for Columns and Items.
    columns: "flex flex-col md:flex-row space-x-10",
    items: "flex flex-row space-x-7",

    // Form Inputs and Selection.
    label: "block text-sm font-medium text-gray-700 mb-4",
    textInput: "w-full h-[40px] mb-5 p-3 border-2 border-gray-300 rounded-lg transition focus:ring-1 focus:ring-light-beige outline-none resize-none",
    collection: "flex flex-row space-x-5",
    group: "flex flex-row items-center space-x-4",

    // Image Upload Section.
    uploadLabel: "text-center w-47 p-2 rounded-lg border-2 border-gray-300 hover:cursor-pointer",
    imageContainer: "w-full h-[300px] rounded-lg border-2 border-gray-300 flex justify-center items-center p-8",
    image: "max-w-full max-h-full object-contain rounded-md",
    clearButton: "text-center w-47 p-2 rounded-lg border-2 border-red-400 transition hover:bg-red-400 hover:text-white hover:cursor-pointer",

    // Action Buttons (Create and Cancel).
    createButton: "w-47 bg-beige text-white font-semibold p-2 rounded-2xl mt-10 shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",
    cancelButton: "w-47 bg-light-bluish-gray text-white font-semibold p-2 rounded-2xl mt-10 shadow-md transition hover:bg-dark-bluish-gray hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",

    // Transition and Position.
    transitionVisible: "transform translate-y-0 opacity-100",
    transitionHidden: "transform translate-y-full opacity-0",
};

export const userProfileStyles = {
    // Layout and Structure.
    main: "flex justify-center bg-gray-100 gap-4 overflow-hidden max-h-screen",
    mainPanel: "w-full overflow-auto mt-16 pl-6 pr-6 h-screen hide-scrollbar",
    container: "flex flex-col justify-center w-[75%] max-h-[85vh] p-6 bg-white rounded-2xl shadow-md mt-6 mx-auto",

    // Header.
    title: "flex-1 text-xl font-bold text-brown mb-6 text-center border-b-3 border-light-gray pb-2 w-[300px] mx-auto",
    subtitle: "flex-1 texl-lg font-semibold text-gray-700 text-center border-2 border-light-beige bg-white p-2 mt-6 mb-4 rounded-xl w-1/6 mx-auto",
    paragraph: "text-gray-500 text-center",

    // User Card and Content.
    userProfile: "flex flex-row items-center justify-center border-2 border-light-gray p-6 rounded-2xl bg-white",
    usersSection: "flex items-center w-full max-w-full overflow-x-auto bg-gray-100 hide-scrollbar bg-white border-b-2 border-light-gray pb-4",
    followers: "flex flex-row gap-6 w-max px-4 py-2",
    follower: "min-w-[200px] flex-shrink-0 border-2 border-light-gray p-4 rounded-2xl bg-white transition hover:bg-gray-100",
    user: "flex items-center text-left",
    profileImage: "w-12 h-12 rounded-full mr-3",
    group: "flex flex-col text-dark-bluish-gray font-semibold",
    username: "text-gray-400 font-normal text-sm",

    // Button.
    updateButton: "w-[150px] bg-beige text-white font-semibold ml-5 p-2 rounded-2xl shadow-md transition hover:bg-dark-beige hover:cursor-pointer hover:translate-y-[-0.25rem] hover:shadow-lg",

    // Error Message.
    errorMessage: "text-sm text-red-500 bg-red-100 p-2 rounded-md mb-6 text-center mx-auto",
};
