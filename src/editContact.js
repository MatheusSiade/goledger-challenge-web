import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputMask from 'react-input-mask';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SaveIcon from '@material-ui/icons/Save';
const styles = theme => ({
    input:{
        margin: '0 0 10px 0 '
    },
    inputHalfLeft:{
        margin: '0 5px 10px 0',
    },
    inputHalfRight:{
        margin: '0 0 10px 5px',
    },
    rightButton:{
        position: 'absolute',
        right: '0',
    }
});
class EditContact extends React.Component {
    constructor(props) {
        super(props);
        let company = this.props.contact.phone === undefined;
        this.state = {
            company: company,
            name: this.props.contact.name,
            phone: this.props.contact.phone,
            phoneError: false,
            phoneErrorText: "",
            companyName: this.props.contact.company,
            email: this.props.contact.email,
            age: this.props.contact.age,
            address: this.props.contact.address,
            addressError: false,
            addressErrorText: "",
            companyPhone: this.props.contact.number,
            companyPhoneError: false,
            companyPhoneErrorText: "",
            website: this.props.contact.site,
            peopleCount: this.props.contact.nemployees,
            modalOpen: false,
            answer: [],
            mask: "(99)9999-99999"
        };
    }

    handleAddressChange = (e) => {
        let address = e.target.value;
        if (address.length === 0) {
            this.setState({address: address, addressError: true, addressErrorText: "O campo é obrigatório"});
        } else {
            this.setState({address: address, addressError: false, addressErrorText: ""});
        }
    };
    handlePhoneChange = (e) => {
        let phone = e.target.value;
        if (phone.length !== 14) {
            this.setState({
                phone: phone,
                phoneError: true,
                phoneErrorText: "O número deve ser escrito no formato (XX)XXXXX-XXXX"
            });
        } else if (phone.length === 14) {
            this.setState({phone: phone, phoneError: false, phoneErrorText: ""});
        }
    };
    handleCompanyPhoneChange = (e) => {
        let companyPhone = e.target.value;
        if (companyPhone.length !== 14 && companyPhone.length !== 13) {
            this.setState({
                companyPhone: companyPhone,
                companyPhoneError: true,
                companyPhoneErrorText: "O número deve ser escrito no formato (XX)XXXXX-XXXX"
            });
        } else if (companyPhone.length === 14 || companyPhone.length === 13) {
            if (companyPhone.length === 13) {
                this.setState({mask: "(99)9999-99999"})
            } else if (companyPhone.length === 14) {
                this.setState({mask: "(99)99999-9999"})
            }
            this.setState({companyPhone: companyPhone, companyPhoneError: false, companyPhoneErrorText: ""});
        }
    };
    handleCompanyNameChange = (e) => {
        let companyName = e.target.value;
        this.setState({companyName: companyName});
    };
    handleEmailChange = (e) => {
        let email = e.target.value;
        this.setState({email: email});
    };
    handleAgeChange = (e) => {
        let age = e.target.value;
        this.setState({age: age});
    };
    handleSiteChange = (e) => {
        let website = e.target.value;
        this.setState({website: website});
    };
    handlePeopleCountChange = (e) => {
        let peopleCount = e.target.value;
        this.setState({peopleCount: peopleCount});
    };

    submitForm(e) {
        let name = this.state.name;
        if (this.state.company === false) {
            let phone = this.state.phone;
            if (phone.length === 0) {
                this.setState({phoneError: true, phoneErrorText: "O preenchimento do telefone é obrigatório"});
            }
            if ((!this.state.nameError && !this.state.phoneError)) {
                this.updateContact().then(answer => {
                    window.location.reload();
                }).catch(console.log);
            }
        } else {
            let address = this.state.address;
            if (address.length === 0) {
                this.setState({phoneError: true, phoneErrorText: "O preenchimento do endereço é obrigatório"});
            }
            let companyPhone = this.state.companyPhone;
            if (companyPhone.length === 0) {
                this.setState({companyPhoneError: true, companyPhoneErrorText: "O preenchimento do telefone é obrigatório"});
            }
            if ((!this.state.addressError) && (!this.state.companyPhoneError)) {
                this.updateContact().then(answer => {
                    window.location.reload();
                }).catch(console.log);
            }
        }
    }

    async updateContact() {

        let json;
        if (!this.state.company) {
            if (parseInt(this.state.age) !== null) {
                json = JSON.stringify({
                    "@assetType": "contact",
                    name: this.state.name,
                    phone: this.state.phone,
                    company: this.state.companyName,
                    email: this.state.email,
                    age: parseInt(this.state.age)
                });
            } else {
                json = JSON.stringify({
                    "@assetType": "contact",
                    name: this.state.name,
                    phone: this.state.phone,
                    company: this.state.companyName,
                    email: this.state.email,
                });
            }
        } else {
            // noinspection DuplicatedCode

            if (parseInt(this.state.peopleCount) !== null ) {
                json = JSON.stringify({
                    "@assetType": "company",
                    name: this.state.name,
                    address: this.state.address,
                    number: this.state.companyPhone,
                    site: this.state.website,
                    nemployees: parseInt(this.state.peopleCount)
                });
            } else {
                json = JSON.stringify({
                    "@assetType": "company",
                    name: this.state.name,
                    address: this.state.address,
                    number: this.state.companyPhone,
                    site: this.state.website,
                });
            }
        }

        console.log(json);
        const response = await fetch('http://ec2-100-27-2-255.compute-1.amazonaws.com/api/update', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: json,
        });
        return await response.json();
    }

    render() {
        const {classes} = this.props;
        return <div>

            <form autoComplete="off" id="myForm">

                {!this.state.company &&
                <div>
                    <div style={{display:'flex'}}>
                        <div style={{width: '70%'}}>
                            <InputMask mask="(99)99999-9999" value={this.state.phone} onChange={this.handlePhoneChange}
                                       maskChar="">
                                {() => <TextField className={classes.inputHalfLeft}  error={this.state.phoneError} id="outlined-basic" label="Telefone"
                                                  variant="outlined" helperText={this.state.phoneErrorText} fullWidth/>}
                            </InputMask>
                        </div>
                        <div style={{width: '30%'}}>
                            <InputMask   mask="99" value={this.state.age} onChange={this.handleAgeChange} maskChar="">
                                {() => <TextField className={classes.inputHalfRight} id="outlined-basic" label="Idade"
                                                  variant="outlined" fullWidth/>}
                            </InputMask>
                        </div>

                    </div>

                    <TextField value={this.state.companyName} className={classes.input} onChange={this.handleCompanyNameChange}
                               id="outlined-basic" label="Empresa" variant="outlined" fullWidth/>
                    <TextField id="outlined-basic" value={this.state.email} className={classes.input} onChange={this.handleEmailChange}
                               label="Email" variant="outlined" fullWidth/>

                </div>}

                {this.state.company &&
                <div>
                    <TextField  className={classes.input} error={this.state.addressError} id="outlined-basic" label="Endereço"
                                value={this.state.address}
                                onChange={this.handleAddressChange} variant="outlined"
                                helperText={this.state.addressErrorText}
                                fullWidth/>

                    <InputMask mask={this.state.mask} value={this.state.companyPhone}
                               onChange={this.handleCompanyPhoneChange}
                               maskChar="">
                        {() => <TextField   className={classes.input}  error={this.state.companyPhoneError} id="outlined-basic"
                                            label="Telefone"
                                            variant="outlined" helperText={this.state.companyPhoneErrorText}
                                            fullWidth/>}
                    </InputMask>
                    <TextField   className={classes.input} id="outlined-basic" value={this.state.website} onChange={this.handleSiteChange}
                                 label="Site" variant="outlined" fullWidth/>

                    <InputMask mask="999999" value={this.state.peopleCount} onChange={this.handlePeopleCountChange}
                               maskChar="">
                        {() => <TextField  className={classes.input}  id="outlined-basic" label="Número de Funcionários"
                                           variant="outlined" fullWidth/>}
                    </InputMask>
                </div>}
                <div style={{width:'100%',height: 50, position: 'relative'}}><Button variant="outlined" color="primary" className={classes.rightButton} onClickCapture={() => this.submitForm()} startIcon={<SaveIcon/>}>Salvar Alterações</Button></div>

            </form>
        </div>
    }
}
EditContact.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditContact);
