import { useState, createContext } from "react";
import Header from "./components/Header/Header";
import { SideBar } from "./components/SideBar/SideBar";
import { AppInfoBar } from "./components/AppInfoBar/AppInfoBar";
import { CentralTextArea } from "./components/CentralTextArea/CentralTextArea";
import { Footer } from "./components/Footer/Footer";

export const CurrentUserContext = createContext();
export const QuestionContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [question, setQuestion] = useState(null);

  return (
    <div className="page-layout">
      <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
        <QuestionContext.Provider value={[question, setQuestion]}>
          <Header />
          <div className="ticket-layout">
            <SideBar />
            <CentralTextArea />
            <AppInfoBar />
          </div>
          <Footer />
        </QuestionContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
