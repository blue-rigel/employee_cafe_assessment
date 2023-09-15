import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/404";
import IndexPage from "./pages";
import DefaultLayout from "./layout";
import EmployeesPage from "./pages/employees";
import AddEditCafe from "./pages/manageCafe";
import AddEditEmployee from "./pages/manageEmployee";

export default function Pages() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="cafe/:cafeId" element={<AddEditCafe />} />
                    <Route path="employees" element={<EmployeesPage />} />
                    <Route path="employee/:employeeId" element={<AddEditEmployee />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Layout>
    );
}
