import React, {Component} from 'react';
import { Consumer } from "../../context";
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';



class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    // Fetching the contact data from the backend and putting it in the state
    async componentDidMount(){
        const  { id } = this.props.match.params; // lets you pull the id from the parameter.
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        // putting the response data in the var "contact"
        const contact = res.data;

        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        });
    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();

        const { name, email,  phone } = this.state;

        //Check for errors
        if(name === '') {
            this.setState({errors: {name:'Name is required' }});
            return;
        }
        if(email === '') {
            this.setState({errors: {email:'Email is required' }});
            return;
        }
        if(phone === '') {
            this.setState({errors: {phone:'Phone is required' }});
            return;
        }

        // You're able to get and edit "Name, email, phone" Because it's coming from the state.
        const updContact = {
            name: name,
            email: email,
            phone: phone
        };

        // here you make the PUT  request "you pull the id out of the URL"
        const  { id } = this.props.match.params;

        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

        dispatch({type: 'UPDATE_CONTACT', payload: res.data});

        // Here you clear the state again so the fields get emptied out after submitting.
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });
        this.props.history.push('/'); // here you redirect to the homepage after submitting.
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});


    render() {
        const { name, email, phone, errors} = this.state; // Here you pull the name, email, phone out of this.state.

        return (
            <Consumer>
                {value => {
                    const { dispatch } =value;
                    return(
                        <div className="card mb-3">
                            <div className="card-header">Edit Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name..."
                                        value={name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email..."
                                        value={email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />
                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        placeholder="Enter Phone..."
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    />
                                    <input type="submit" value="Update Contact" className="btn btn-light btn-block"/>
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default EditContact;