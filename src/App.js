import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import './assets/scss/main.scss';
import FormTemplate from './template/FormTemplate';
import HomeTemplate from './template/HomeTemplate';
import Login from './Pages/Login/Login';
import ProjectDashboard from './Pages/Project/ProjectDashboard';
import Loading from './components/Loading/Loading';
import DrawerHOC from './components/HOC/DrawerHOC';
import Register from './Pages/Register/Register';
import FormCreateTask from './components/Forms/FormTask/FormCreateTask';
import ProjectDetail from './Pages/Project/ProjectDetail';
import DragAndDropDnD from './components/DragAndDropDnD/DragAndDropDnD';
export const history = createBrowserHistory();
function App() {
   return (
      <Router history={history}>
         <Loading/>
         <DrawerHOC/>
         <Switch>
            <HomeTemplate
               path='/home'
               component={ProjectDashboard}
            />
            <FormTemplate
               exact
               path='/login'
               component={Login}
            />
             <FormTemplate
               exact
               path='/register'
               component={Register}
            />
            <HomeTemplate
               path='/projectdetail/:projectId'
               component={ProjectDetail}
            />
            <HomeTemplate
               path='/demo'
               component={DragAndDropDnD}
            />
            <HomeTemplate
               path='/'
               component={ProjectDashboard}
            />
         </Switch>
      </Router>
   );
}

export default App;
