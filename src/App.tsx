import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeListPage from '@/pages/EmployeeListPage';
import EmployeeProfilePage from '@/pages/EmployeeProfilePage';
import EmployeePrintPage from '@/pages/EmployeePrintPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeListPage />} />
        <Route path="/employee/:id" element={<EmployeeProfilePage />} />
        <Route path="/employee/:id/print" element={<EmployeePrintPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
