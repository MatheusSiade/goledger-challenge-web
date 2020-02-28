import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputMask from 'react-input-mask';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    input:{
        margin: '0 0 10px 0 '
    },
    inputHalfLeft:{
        margin: '0 5px 10px 0',
    },
    inputHalfRight:{
        margin: '0 0 10px 5px',
    }
});
class CreateContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: false,
            name: "",
            nameError: false,
            nameErrorText: "",
            phone: "",
            phoneError: false,
            phoneErrorText: "",
            companyName: "",
            email: "",
            age: "",
            address: "",
            addressError: false,
            addressErrorText: "",
            companyPhone: "",
            companyPhoneError: false,
            companyPhoneErrorText: "",
            website: "",
            peopleCount: "",
            modalOpen: false,
            answer: [],
            tab: 0,
            mask: "(99)9999-99999"
        };
        /*this.handleClickOpen = this.handleClickOpen.bind(this);*/
    }

    handleTabChange = (event, newValue) => {
        if (newValue === 0) {
            this.setState({company: false})
        } else if (newValue === 1) {
            this.setState({company: true})
        }
        this.setState({tab: newValue});
    };
    handleClickOpen = () => {
        this.setState({modalOpen: true})
    };

    handleClose = () => {
        this.setState({modalOpen: false})
    };
    handleNameChange = (e) => {
        let name = e.target.value;
        if (name.length <= 2) {
            this.setState({name: name, nameError: true, nameErrorText: "O nome deve ter no mínimo 3 caracteres"});
        } else if (name.length > 2) {
            this.setState({name: name, nameError: false, nameErrorText: ""});
        }
    };
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
        if (companyPhone.length !== 14 && companyPhone.length !== 13 && companyPhone.length !== 0) {
            this.setState({
                companyPhone: companyPhone,
                companyPhoneError: true,
                companyPhoneErrorText: "O número deve ser escrito no formato (XX)XXXXX-XXXX"
            });
        } else if (companyPhone.length === 14 || companyPhone.length === 13 || companyPhone.length === 0) {
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
        if (name.length === 0 || name === " ") {
            this.setState({nameError: true, nameErrorText: "O preenchimento do nome é obrigatório"});
        }else if (this.state.company === false) {
            let phone = this.state.phone;
            if (phone.length === 0) {
                this.setState({phoneError: true, phoneErrorText: "O preenchimento do telefone é obrigatório"});
            } else if ((!this.state.nameError) && (!this.state.phoneError)) {
                this.createContact().then(answer => {
                    window.location.reload();
                }).catch(console.log);
            }
        } else {
            let address = this.state.address;
            let companyPhone = this.state.companyPhone;
            if (address.length === 0) {
                this.setState({addressError: true, addressErrorText: "O preenchimento do endereço é obrigatório"});
            }else if (companyPhone.length === 0) {
                this.setState({companyPhoneError: true, companyPhoneErrorText: "O preenchimento do telefone é obrigatório"});
            }else if ((!this.state.nameError) &&(!this.state.addressError) && (!this.state.companyPhoneError)) {
                this.createContact().then(answer => {
                    window.location.reload();
                }).catch(console.log);
            }
        }
    }

    async createContact() {
        let json;

        if(!this.state.nameError){
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
                if (parseInt(this.state.peopleCount) !== null) {
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
            const response = await fetch('http://ec2-100-27-2-255.compute-1.amazonaws.com/api/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: json,
            }).then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    return response;
                } else if(response.status === 409)  {
                    alert("Já existe usuário com este nome");
                }
            });
            return await response.json();
        }
    }

    render() {
        const {classes} = this.props;
        return <div>
            <Fab variant="extended"  color="primary" style={{position: 'fixed', bottom: '20px', right: '20px'}}
                 onClickCapture={() => this.handleClickOpen()}>
                <AddIcon/>
                Contato
            </Fab>
            <Dialog open={this.state.modalOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <Tabs
                    variant="fullWidth" value={this.state.tab} onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="disabled tabs example"
                >
                    <Tab label="Pessoal"/>
                    <Tab label="Empresarial"/>
                </Tabs>
                <DialogContent>

                    <form autoComplete="off" id="myForm">
                        <TextField className={classes.input} error={this.state.nameError} id="outlined-basic" label="Nome" value={this.state.name}
                                   onChange={this.handleNameChange} variant="outlined"
                                   helperText={this.state.nameErrorText}
                                   fullWidth/>
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
                            <TextField id="outlined-basic" value={this.state.email} onChange={this.handleEmailChange}
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

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.submitForm()}>
                        CRIAR CONTATO
                    </Button>
                </DialogActions>
            </Dialog>
        </div>;

    }


}
CreateContact.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CreateContact);
