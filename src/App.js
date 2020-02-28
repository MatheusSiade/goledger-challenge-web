import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {teal} from "@material-ui/core/colors";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import ContactListBuilder from "./contactListBuilder";
import CreateContact from "./createContact";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    sections:{
        margin: 'auto 0 ',
    }
}));

function App() {
    const classes = useStyles();
    const [searchText, updateSearchText] = React.useState("");
    const handleSearchTextChange = (e) => {
        let text = e.target.value;
        updateSearchText(text);
    };
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setMobileOpen(false);
        setSelectedIndex(index);
    };
    const theme = createMuiTheme({
        palette: {
            primary: teal,
            secondary: {
                main: '#ffee58',
            },
        },
    });
    const drawer = (
        <div>
            <div className={classes.toolbar}>
            </div>
            <Divider />
            <List >
                <ListItem  button
                           selected={selectedIndex === 0}
                           onClick={event => handleListItemClick(event, 0)} key={'Todos'}>
                    <ListItemText primary={'Todos'}/>
                </ListItem>
                <ListItem button
                          selected={selectedIndex === 1}
                          onClick={event => handleListItemClick(event, 1)} button key={'Pessoas'}>
                    <ListItemText primary={'Somente Pessoas'}/>
                </ListItem>
                <ListItem button
                          selected={selectedIndex === 2}
                          onClick={event => handleListItemClick(event, 2)} button key={'Empresas'}>
                    <ListItemText primary={'Somente Empresas'}/>
                </ListItem>
            </List>
        </div>
    );
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <div>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography className={classes.title} variant="h6" noWrap>
                                Contatos
                            </Typography>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Pesquisar…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={searchText}
                                    onChange={handleSearchTextChange}
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>

            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer variant="temporary" anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen} onClose={handleDrawerToggle} classes={{ paper: classes.drawerPaper}}
                        ModalProps={{keepMounted: true}}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{ paper: classes.drawerPaper,}} variant="permanent" open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <div style={{paddingTop: '65px'}} className={classes.content}>
                <ContactListBuilder searchText={searchText} displayBar={selectedIndex}/>
                <CreateContact/>
            </div>
            </ThemeProvider>
        </div>



    );
}

export default App;
