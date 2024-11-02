import { logo } from "./util/constants";
import "./App.css";
import Table from "./components/Table";

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} alt='logo' />
                <h1>Data Table with frozen columns</h1>
            </header>
            <main>
                <Table />
            </main>
        </div>
    );
}

export default App;
