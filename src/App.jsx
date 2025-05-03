import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Layouts
import AuthLayout from './layouts/AuthLayout'
import StudentLayout from './layouts/StudentLayout'
import TeacherLayout from './layouts/TeacherLayout'
import AdminLayout from './layouts/AdminLayout'

// Auth Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// Student Pages
import StudentDashboard from './pages/Student/Dashboard'
import Notes from './pages/Student/Notes'
import Syllabus from './pages/Student/Syllabus'
import Videos from './pages/Student/Videos'
import PYQs from './pages/Student/PYQs'
import Community from './pages/Student/Community'
import PreviewPage from './pages/Student/PreviewPage'

// Teacher Pages
import TeacherDashboard from './pages/Teacher/Dashboard'
import TeacherCommunity from './pages/Teacher/Community'

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard'
import ManageNotes from './pages/Admin/ManageNotes'
import ManageUsers from './pages/Admin/ManageUsers'
import ManageSyllabus from './pages/Admin/ManageSyllabus'
import ManageVideos from './pages/Admin/ManageVideos'
import ManagePYQs from './pages/Admin/ManagePYQs'
import Announcements from './pages/Admin/Announcements'

// Other Pages
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized' // Optional component

function App() {
  const { user, loading } = useAuth()

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (loading) {
      return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
    }

    if (!user) {
      return <Navigate to="/login" replace />
    }

    if (!allowedRoles.includes(user.role)) {
      return <div className="p-4 text-center text-red-500 text-lg">You are not authorized to view this page.</div>
      // OR use a separate page:
      // return <Unauthorized />;
    }

    return children
  }

  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="notes" element={<Notes />} />
        <Route path="syllabus" element={<Syllabus />} />
        <Route path="videos" element={<Videos />} />
        <Route path="pyqs" element={<PYQs />} />
        <Route path="community" element={<Community />} />
        <Route path="preview/:type/:id" element={<PreviewPage />} />
        <Route index element={<Navigate to="/student/dashboard" replace />} />
      </Route>

      {/* Teacher Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="community" element={<TeacherCommunity />} />
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-notes" element={<ManageNotes />} />
        <Route path="manage-syllabus" element={<ManageSyllabus />} />
        <Route path="manage-videos" element={<ManageVideos />} />
        <Route path="manage-pyqs" element={<ManagePYQs />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="announcements" element={<Announcements />} />
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
