import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
// Learner
import LearnerLayout from './components/Learner/LearnerLayout';
import LearnerHomepage from './components/Learner/LearnerHomepage';
import AssessmentVisualization from './components/Learner/AssessmentVisualization';
import LearnerIndex from './components/Learner/Index';
import LearnerSignup from './components/Learner/Signup';
import LearnerLogin from './components/Learner/Login';
import GetAllLearners from './components/Learner/GetAllLearners';
// Tutor
import TutorLayout from './components/Tutor/TutorLayout';
import TutorHomepage from './components/Tutor/TutorHomepage';
import TutorIndex from './components/Tutor/Index';
import TutorSignup from './components/Tutor/Signup';
import TutorLogin from './components/Tutor/Login';
import SetAssessmentVariables from './components/Tutor/SetAssessmentVariables';
// Subject: (Admin)
import AdminPage from './components/Admin/Index';
import AdminLogin from './components/Admin/Login';
import RegisterSubject from './components/Admin/subject';
// Main-Page
import TeacherLearnerLogin from './components/header_footer/Teacher_Student_login';
import TeacherLearnerSignup from './components/header_footer/Teacher_Student_signup';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/404';
// Assessments
import AssessmentIndex from './components/assessment/Index';
import OneLearnerOneSubject from './components/assessment/OneLearnerOneSubject';
import OneLearnerManySubject from './components/assessment/OneLearnerManySubject';
import ClassAverage from './components/assessment/ClassAverage';
import Visualizations from './components/assessment/Visualizations';



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Layout setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} >            {/* Layout: Homepage, Public page  ---> "Template to add 'navbar/footer'" */}

        {/* Homepage route */}
        <Route index element={<Public />} />              {/* index: -> Default component rendered in path "/" */}

        {/* Student route */}
        <Route path="learner" element={<LearnerLayout />}>   {/* To add some custom elements in teacher homepage */}
          <Route index element={<LearnerIndex />} />
          {
            (isAuthenticated && userType==="Student") && 
            <>
              <Route path="users/:username" element={<LearnerHomepage />} /> 
              <Route path="users/:username/viewAssessment" element={<AssessmentVisualization />} />
            </>
          }
          <Route path="getLearners" element={<GetAllLearners />} />
          {
            (!isAuthenticated) && 
            <>
              <Route path="login" element={<LearnerLogin />} />
              <Route path="signup" element={<LearnerSignup />} />
            </>
          }
        </Route>

        {/* Admin route */}
        <Route path="admin">
          <Route index element={<AdminPage />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="setSubject" element={<RegisterSubject />} />
        </Route>

        {/* Teacher route */}
        <Route path="tutor" element={<TutorLayout />}>        {/* To add some custom elements in student homepage */}
          <Route index element={<TutorIndex />} />
          {
            (isAuthenticated && userType==="Teacher") && 
            <Route path="users/:username" element={<TutorHomepage />} /> 
          }
          {
            (!isAuthenticated) &&
            <>
              <Route path="login" element={<TutorLogin />} />        
              <Route path="signup" element={<TutorSignup />} />      
            </>
          }
          <Route path="setAssessmentVariables" element={<SetAssessmentVariables />} />        
        </Route>

        <Route path="assessment" element={<TutorLayout />}>
          <Route index element={<AssessmentIndex />} />
          <Route path="oneLearnerOneSubject" element={<OneLearnerOneSubject />} />
          <Route path="oneLearnerManySubject" element={<OneLearnerManySubject />} />        
          <Route path="ClassAverage" element={<ClassAverage />} />        
          <Route path="assess-student" element={<Visualizations />} />        
        </Route>

        <Route path="about" element={<About />} />
        
        <Route path="contact" element={<Contact />} />

        <Route path="login" element={<TeacherLearnerLogin />} />    

        <Route path="signup" element={<TeacherLearnerSignup />} />    
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
