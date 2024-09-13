import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Activity/Home";
import Header from "./components/Common/header";
import Footer from "./components/Common/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import ActivityDetail from "./components/Activity/ActivityDetail";
import { MyDispatchContext, MyUserContext } from "./configs/Contexts";
import { useReducer } from "react";
import MyUserReducer from "./configs/Reducers";
import ActivityAdd from "./components/Activity/ActivityAdd";
import ActivityRegistration from "./components/Activity/ActivityRegistration";
import ActivityJoined from "./components/Activity/ActivityJoined";
import MissingReport from "./components/MissingActivity/MissingReport";
import MissingReportAssistant from "./components/MissingActivity/MissingReportAssistant";
import MissingReportStudent from "./components/MissingActivity/MissingReportStudent";
import Criterions from "./components/Criterion/Criterions";
import StudentScore from "./components/Score/StudentScore";
import ChartByClass from "./components/Static/ChartByClass";
import ActivityCsvUpload from "./components/Activity/ActivityCsvUpload";



const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <BrowserRouter>
      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          <Header />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/activities/:activityId" element={<ActivityDetail />} />
              <Route path="/activities/create/:userId" element={<ActivityAdd />} />
              <Route path="/activities/registration" element={<ActivityRegistration />} />
              <Route path="/activities/joined" element={<ActivityJoined />}/>
              <Route path="/assistant" element={<MissingReport />}>
                <Route path="missingreport" element={<MissingReportAssistant />}/>
                <Route path="stats/class" element={<ChartByClass />}/>
                <Route path="upload-csv/:activityId" element={<ActivityCsvUpload/> }/>
              </Route>
              <Route path="/missingreport/:activityId" element={<MissingReportStudent/>} />
              <Route path="/criterions" element={<Criterions />}/>
              <Route path="/scores/" element={<StudentScore/>}/>
            </Routes>

          </Container>

          <Footer />
        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;