import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';



import { Provider } from './context';


import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

// Meeting place for all components
class App extends Component {
    render() {
    return (
        <Provider> {/* Here you wrap your main app in the provider so you have access to it. */}
       <Router>
        <div className="App">
            <Header branding="Contact Manager"/> {/* Here you pass props "branding" to the header component "which is a functional component" */ }
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Contacts}/>
                    <Route exact path="/contact/add" component={AddContact}/>
                    <Route exact path="/contact/edit/:id" component={EditContact}/>
                    <Route exact path="/about" component={About}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </div>
       </Router>
        </Provider>
    );
    }
}
export default App;
