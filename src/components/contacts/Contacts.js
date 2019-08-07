import React, {Component} from 'react';
import Contact from './Contact'
import { Consumer} from "../../context"; // import Consumer anywhere you need access to context.

class Contacts extends Component {

    render() {
        {/* here you return consumer, which value contains the whole state*/}
        return(
            <Consumer>
                {value => {
                    const { contacts } = value;
                    return (
                        <React.Fragment> {/* React fragment to make this a pseudo element. "won't show up in the dom*/}
                           <h1 className="display-4 mb-2">
                               <span className="text-danger">Contact</span> List
                           </h1>
                            {contacts.map(contact => ( // looping through the contacts with map and returning a single "contact component" for each one of them.
                                <Contact
                                    key={contact.id}
                                    contact={contact}
                                />
                            ))}
                        </React.Fragment>
                    )
                }}
            </Consumer>
        );
    }
}

export default Contacts;