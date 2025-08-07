import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Navbar from './components/Navbar';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <AppRoutes />
            </main>
        </BrowserRouter>
    );
}

export default App;
