import React, {useEffect} from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemText} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import EditContact from "./editContact";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from "@material-ui/core/Typography";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from "@material-ui/core/styles/useTheme";
import PhoneIcon from '@material-ui/icons/Phone';
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/Room';
import LanguageIcon from '@material-ui/icons/Language';
const useStyles = makeStyles(theme => ({
    modalTitle: {
        textAlign: 'center',
        paddingBottom: 0
    },
    modalDivider: {
        backgroundColor: 'black'
    },

}));

function ContactList(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [modalTitle, setTitle] = React.useState("Nome");
    const [modalContent1, setContent1] = React.useState("a");
    const [modalContent2, setContent2] = React.useState("a");
    const [modalContent3, setContent3] = React.useState("a");
    const [modalContent4, setContent4] = React.useState("a");
    const [contact, setContact] = React.useState(null);
    const [isCompany, setCompany] = React.useState(null);
    const [edit, setEdit] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEdit(false);
    };
    const handleEdit = () => {
        setEdit(!edit)
    };


    const getContactData = (contact) => {
        setContact(contact);
        if (contact.phone === undefined) {
            setTitle(contact.name);
            setCompany(true);
            setContent1(contact.address);
            setContent2(contact.number);
            setContent3(contact.site);
            setContent4(contact.nemployees);
            handleClickOpen();
        } else {
            setTitle(contact.name);
            setCompany(false);
            setContent1(contact.phone);
            setContent2(contact.company);
            setContent3(contact.email);
            setContent4(contact.age);
            handleClickOpen();
        }

    };
    const deleteContact = (contact) => {
        let assetType;
        if (contact.phone === undefined) {
            assetType = "company"
        } else assetType = "contact";
        let json = JSON.stringify({
            "@assetType": assetType,
            "name": contact.name,
        });

        fetch('http://ec2-100-27-2-255.compute-1.amazonaws.com/api/delete', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: json,
        }).then(function () {
            window.location.reload();
        });

    };

    const myData = [].concat(props.contacts).sort(function (a, b) {

        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    return (
        <div>
            <List>
                {myData.map((contact, index) => (
                    <ListItem button key={contact.name} onClickCapture={() => getContactData(contact)}>
                        {(contact.phone === undefined) && <ListItemIcon>
                            <BusinessIcon/>
                        </ListItemIcon>}
                        {(contact.address === undefined) && <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>}
                        <ListItemText primary={contact.name} secondary={contact.phone || contact.address}/>
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth>
                <DialogTitle className={classes.modalTitle}>{modalTitle}</DialogTitle>
                <Divider className={classes.modalDivider} variant="middle"/>
                <DialogContent>
                    {!edit && <DialogContentText >

                        {isCompany && <List>
                            <ListItem>
                                <ListItemIcon>
                                    <RoomIcon/>
                                </ListItemIcon>
                                <ListItemText primary={modalContent1}/>
                            </ListItem>
                            { (modalContent2 !== "") && <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={modalContent2}
                                />
                            </ListItem>}
                            { (modalContent3 !== undefined) && <ListItem>
                                <ListItemIcon>
                                    <LanguageIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={modalContent3}
                                />
                            </ListItem>}
                            { (modalContent4 !== undefined) && <ListItem>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={modalContent4 + " funcionários"}
                                />
                            </ListItem>}
                        </List>}
                        {!isCompany && <List>
                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon/>
                                </ListItemIcon>
                                <ListItemText primary={modalContent1}/>
                            </ListItem>
                            { (modalContent2 !== "") &&<ListItem>
                                <ListItemIcon>
                                    <BusinessIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={modalContent2}
                                />
                            </ListItem>}
                            { (modalContent3 !== "") &&<ListItem>
                                <ListItemIcon>
                                    <EmailIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={modalContent3}
                                />
                            </ListItem>}
                            { (modalContent4 !== undefined) && <ListItem>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={modalContent4 + " anos"}
                                />
                            </ListItem>}
                        </List>}

                    </DialogContentText>}
                    {edit && <EditContact contact={contact}/>}
                </DialogContent>
                <DialogActions>
                    <div>
                        <Button onClickCapture={handleEdit}><EditIcon/></Button>
                        <Button onClickCapture={() => deleteContact(contact)}><DeleteIcon/></Button>
                    </div>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default (ContactList)
