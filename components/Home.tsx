import { useHistoryContext } from "../context/HistoryContext";
import AddNameComponent from "./AddNameComponent";
import Pomodoro from "./Pomodoro";

const Home = () => {
    const {history: history} = useHistoryContext();

    return history.name === "nameToChange" ? <AddNameComponent/> : <Pomodoro/>
}

export default Home;