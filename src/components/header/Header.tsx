import React, {useCallback, useState} from 'react';
import s from './Header.module.scss';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import {useNavigate} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

type PagesType = 'profile' | 'dialogs' | 'users' | 'settings'

export const Header = React.memo(() => {

    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<PagesType>('profile')

    const handleDrawerOpen = useCallback(() => setOpen(true), [])
    const handleDrawerClose = useCallback(() => setOpen(false), [])

    const navigateTo = useCallback((page: PagesType) => () => {
        navigate(page)
        setCurrentPage(page)
    }, [navigate])

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap className={s.currentPage}>
                        {currentPage}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar} style={{backgroundColor: '#3f51b5'}}>
                    <Typography style={{marginRight: '20px', color: '#fff'}} variant="h6" noWrap>
                        Social Network
                    </Typography>
                    <IconButton onClick={handleDrawerClose} style={{color: '#fff'}}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button onClick={navigateTo('profile')}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize={'large'}/>
                        </ListItemIcon>
                        <ListItemText primary={'Profile'}/>
                    </ListItem>
                    <ListItem button onClick={navigateTo('dialogs')}>
                        <ListItemIcon>
                            <ChatIcon fontSize={'large'}/>
                        </ListItemIcon>
                        <ListItemText primary={'Dialogs'}/>
                    </ListItem>
                    <ListItem button onClick={navigateTo('users')}>
                        <ListItemIcon>
                            <GroupIcon fontSize={'large'}/>
                        </ListItemIcon>
                        <ListItemText primary={'Users'}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon fontSize={'large'}/>
                        </ListItemIcon>
                        <ListItemText primary={'Settings'}/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
})
