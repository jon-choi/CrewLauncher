import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Crews from './components/Crews/index';
import Dispatch from './components/Dispatch/index'
import './App.scss';
import useAppData from './hooks/AppData';
import { Stack } from '@mui/material';


const App = function() {
  const { state, createNewPackage, processContract, saveJobEdit, onSubmitQuote, updateQuoteState, markJobCompleted } = useAppData()

  return (
    <Router minHeight='100%' >

        <div className="App">
          <Switch >
            <Route path='/crews/:id' >
              <Crews { ...state } onSubmitQuote={onSubmitQuote} markJobCompleted={markJobCompleted} />
            </Route>
            <Route path='/dispatch' >
              <div className='dispatch-container'>
                <Dispatch { ...state } onEdit={saveJobEdit} createPackage={createNewPackage} createContract={processContract} updateQuoteState={updateQuoteState} /> 
              </div>
            </Route> 
            <Route path='/'>
              <Stack>
                <div><Link to='/dispatch'>Dispatch</Link></div>
                <div><Link to='/crews'>Crews</Link></div>
                <div><Link to='/crews/1'>Crew #1</Link></div>
                <div><Link to='/crews/2'>Crew #2</Link></div>
                <div><Link to='/crews/3'>Crew #3</Link></div>
                <p><b>Welcome to Crew Launcher 🚀</b></p>
                <body>
                  <img alt="rocket launch" src="https://woodofmouth.files.wordpress.com/2012/03/space-travel.gif"></img>
                </body>
              </Stack>
            </Route>
          </Switch>    
        </div>
    </Router>
  );
}

export default App;
