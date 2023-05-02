import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { Home } from "./pages"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}