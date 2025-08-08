import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.tsx';
import ShortLinksList from '../pages/ShortLinks/List.tsx';
import ShortLinksDetail from '../pages/ShortLinks/Detail';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/shortlinks'} element={<ShortLinksList />} />
            <Route path={'/shortlinks/:id'} element={<ShortLinksDetail />} />
        </Routes>
    );
}
