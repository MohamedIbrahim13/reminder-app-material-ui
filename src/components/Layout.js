import { useState } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles,useTheme } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import Avatar from "@material-ui/core/Avatar";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import {useHistory,useLocation} from 'react-router-dom'
import {format} from 'date-fns';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
    fontWeight: 500,
	marginLeft:theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: 0,
    paddingRight: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  labelShift: {
    marginRight: theme.spacing(1),
  },
  active: {
    background: "#f4f4f4",
  },
  avatar:{
    marginLeft:theme.spacing(2)
  }
}));

const Layout = (props) => {
	const history=useHistory();
	const location = useLocation();
  const classes = useStyles();
  const theme =useTheme();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    "light": true,
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.checked });
  };
  const menuItems = [
    
    {
      text: "Light Mode",
      icon: <Brightness4Icon color="secondary"/>,
      path: "/#mode",
    },
    {
      text: "Home",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Add Memo",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create-memo",
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            className={classes.title}
          >Today is the {format(new Date(),'do MMMM Y')}</Typography>
          <Typography>Mohamed</Typography>
          <Avatar className={classes.avatar} src="/author.jpg"/>
        </Toolbar>
      </AppBar>
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltl" ? (
              
			   <ChevronRightIcon />
            ) : (
               <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Mohamed Ibrahim">
            <ListItemIcon>
              <Avatar color="secondary">MI</Avatar>
            </ListItemIcon>
            <ListItemText primary="Mohamed Ibrahim" />
          </ListItem>
          <Divider />
          {["Github", "Twitter"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <GitHubIcon color="secondary"/> : <TwitterIcon color="secondary"/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

          <ListItem button key="Light Mode">
            <ListItemIcon>
              <FormControlLabel
                control={
                  <Switch
				            color="secondary"
                    checked={state["light"]}
                    onChange={handleChange}
                    name="Light Mode"
                    className={classes.labelShift}
                  />
                }
                label="Light Mode"
              />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
	  <div
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
	      <div className={classes.drawerHeader} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
