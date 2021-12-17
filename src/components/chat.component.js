import React, { useEffect, useRef, useState } from "react"
import { Grid } from '@material-ui/core'
import io from 'socket.io-client'
import useUser from '../hooks/useUser'
import TextField from "@material-ui/core/TextField"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

export default function Chat() {
  const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])
	
	const socket = io('http://localhost:5000')
	const socketRef = useRef()

	//var sender="Refael Bardugo";
	// useEffect(
	// 	() => {
	// 		socketRef.current = io.connect("http://localhost:5000")
	// 		socketRef.current.emit('AddUser', state.name);

	// 		return () => socketRef.current.disconnect()
	// 	},
	// 	[ chat ]
	// )
	
	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:5000")
			socketRef.current.on("message", ({ name, message }) => {
        alert("workchat");

				//alert(state.name);
                //if (name === state.name || name === sender) {
                    setChat([ ...chat, { name, message } ])
                //}				
			})
			
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
        alert(name, message)
		e.preventDefault()
		setState({ message: "", name })
	}
	// const renderChat = () => {
	// 	return chat.map(({ name, message }, index) => (
	// 		<div key={index}>
	// 			<h3>
	// 				{name}: <span>{message}</span>
	// 			</h3>
	// 		</div>
	// 	))
	// }
    const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<ListItem>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary={message}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
		))
	}






  const classes = useStyles();

    return (
        <div>
        
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                    <TextField
	 					            name="message"
	 					onChange={(e) => onTextChange(e)}
	 					value={state.message}
	 					id="outlined-basic-email"
	 					variant="outlined"
	 					label="Message"
             fullWidth
	           				/>
                        {/* <TextField onChange={(e) => onTextChange(e)} value={state.message} id="outlined-basic-email" variant="outlined" label="Type Something" fullWidth /> */}
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab onClick={onMessageSubmit} color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
	// return (
	// 	<div className="card">
	// 		<form onSubmit={onMessageSubmit}>
	// 			<h1>Messenger</h1>
	// 			<div className="name-field">
	// 				<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
	// 			</div>
	// 			<div>
	// 				<TextField
	// 					name="message"
	// 					onChange={(e) => onTextChange(e)}
	// 					value={state.message}
	// 					id="outlined-multiline-static"
	// 					variant="outlined"
	// 					label="Message"
	// 				/>
	// 			</div>
	// 			<button>Send Message</button>
	// 		</form>
	// 		<div className="render-chat">
	// 			<h1>Chat Log</h1>
	// 			{renderChat()}
	// 		</div>
	// 	</div>
	// )
}