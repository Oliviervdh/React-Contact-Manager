import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer} from "../../context";
import axios from 'axios';

class Contact extends Component{

    state = {
        showContactInfo: false
    };

    onDeleteClick =  async (id, dispatch) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({type: 'DELETE_CONTACT', payload: id});
        } catch(e){
            dispatch({type: 'DELETE_CONTACT', payload: id});
        }
    };

    // Use a arrow function instead of binding "this" the constructor or handler, now the "this" keyword is available inside of the arrow function . "look into .bind()"
    onShowClick = e => {
        this.setState({showContactInfo:
            !this.state.showContactInfo }); // Here you make the event toggle the sate of "showContactInfo()" it sets it to opposite "!example"
    };

    render() {
        const { id, name, email, phone } = this.props.contact; { /* here you prefix all the props with "this.props."; */ }
        const { showContactInfo } = this.state; {/* here you pull showContactInfo value out of "this.state". */ }
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return(
                        <div className="card card-body mb-3">
                            <h4>
                                Name: {name} <i onClick={this.onShowClick} className="fas fa-sort-down" style={{cursor: 'pointer'}} />
                                <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}} onClick={this.onDeleteClick.bind(this, id, dispatch)}/>
                            <Link to={`contact/edit/${id}`}>
                                <i className="fas fa-pencil-alt mr-2" style={{cursor: 'pointer', float: 'right', color: 'black'}}></i>
                            </Link>
                            </h4>
                            {showContactInfo ? (<ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>

                            ) : null}
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

// Typechecking validation "Define what kind of prop type you have".
Contact.propTypes = {
    contact: PropTypes.object.isRequired,
};

// All your components need to be exported to your main App.js file
export default Contact;

