import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";

import Main from "./pages/Main";
import OpeningDetail from "./pages/OpeningDetail";
import Hub from "./pages/Hub";
import Profile from "./pages/Profile";
import Callback from './pages/Callback'
import CreateOpening from "./pages/CreateOpening";
import LoginPage from "./pages/LoginPage";
import AuthRoute from "./pages/AuthRoute";
import OpeningManagerDetail from "./pages/OpeningManagerDetail";
import Test from "./pages/Test";
import HubProfile from "./pages/HubProfile";
import { Alert, Center, Text } from "@chakra-ui/react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Alert bgColor={'rgb(25, 28, 104)'} p={'16px 0 16px 0'}>
          <Center width={'100%'}>
            <Text color={'white'} fontSize={'15px'} fontWeight={500}>[공지] 구해YO 1차 프로토타입</Text>
          </Center>
        </Alert>
          <Header />
          <Routes>
            <Route path="/" 
              element={<Main />} 
            />

            <Route path="/callback" 
              element={<Callback />} 
            />

            <Route path="/opening/:id" 
              element={<OpeningDetail />} 
            />

            <Route exact path="/login" 
              element={<LoginPage />} 
            />

            <Route path="/opening/create" 
              element={<AuthRoute><CreateOpening /></AuthRoute>} 
            />

            <Route path="/hub" 
              element={<Hub />} 
            />

            <Route path="/hub/profile/:email"
              element={<HubProfile />}
            />

            <Route path="/profile/*" 
              element={<AuthRoute><Profile /></AuthRoute>} 
            /> 

            <Route path="/manager/opening/:id" 
              element={<AuthRoute><OpeningManagerDetail /></AuthRoute>}
            />

            <Route path="/test"
              element={<Test />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
