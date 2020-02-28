import * as React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import ContactList from "./contactList";


const styles = theme => ({});

class ContactListBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            searchText: this.props.searchText,
            controller: null,
            signal: null
        };
    }

    componentDidMount() {
        this.getDataFetch(0).then(contacts => {
            this.setState({contacts: contacts.result});
        }).catch(console.log);
    }
    componentDidUpdate(prevProps) {
        if ((this.props.searchText !== prevProps.searchText) ||(this.props.displayBar !== prevProps.displayBar)){
            if(this.props.searchText === ""  ||this.props.searchText === undefined){ this.getDataFetch(this.props.displayBar).then(contacts => {
                this.setState({contacts: contacts.result});
            }).catch(console.log);}
            else{
                this.getSearchFetch(this.props.searchText,this.props.displayBar).then(contacts => {
                    this.setState({contacts: contacts.result});
                }).catch(console.log);
            }
        }

    }
    async getDataFetch(index) {
        if (this.state.controller !== null) {
            // Cancel the previous request
            this.state.controller.abort();
        }
        if ("AbortController" in window) {
            this.state.controller = new AbortController;
            this.state.signal = this.state.controller.signal;
        }
        let json;
        if(index === 0){
            json = JSON.stringify({
                selector: {
                    "$or": [
                        {"@assetType": "contact"},
                        {"@assetType": "company"}
                    ]
                },
            })
        }else if(index ===1){
            json = JSON.stringify({
                selector: {
                    "@assetType": "contact"
                },
            })
        }else if(index === 2){
            json = JSON.stringify({
                selector: {
                    "@assetType": "company"
                },
            })
        }

        const response = await fetch('http://ec2-100-27-2-255.compute-1.amazonaws.com/api/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: json,
            signal: this.state.signal
        } );
        return await response.json();
    }
    async getSearchFetch(searchText, index) {
        let json;
        if(index === 0){
            json = JSON.stringify({
                selector: {
                    name: searchText
                },
            })
        }else if(index ===1){
            json = JSON.stringify({
                selector: {
                    "@assetType": "contact",
                    name: searchText
                },
            })
        }else if(index === 2){
            json = JSON.stringify({
                selector: {
                    "@assetType": "company",
                    name: searchText
                },
            })
        }
        if (this.state.controller !== null) {
            // Cancel the previous request
            this.state.controller.abort();
        }
        if ("AbortController" in window) {
            this.state.controller = new AbortController;
            this.state.signal = this.state.controller.signal;
        }
        const response = await fetch('http://ec2-100-27-2-255.compute-1.amazonaws.com/api/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: json,
            signal: this.state.signal
        });
        return await response.json();
    }

    render() {
        return <div>
            <ContactList contacts={this.state.contacts} />
        </div>;
    }
}

ContactListBuilder.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactListBuilder);
