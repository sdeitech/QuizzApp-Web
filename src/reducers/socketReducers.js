import { data } from 'jquery';
import _ from "underscore";


const initialData = {
    joinRoomReq:false,
	isModerator:false,
	waitScreen:false,
	roomCreatorId:"",
	otherUserSteams:[],
	requestSender:[],
	roomId:"",
	socket:"",
};

const socketReducers = (state = initialData, action) => {
	switch (action.type) {
		case 'JOIN_ROOM_REQ_SEND': return { ...state, joinRoomReq: action.data }

		case 'IS_MODERATOR':return { ...state , isModerator: action.data } 

		case 'SET_ROOMID' : return {...state, roomId: action.data}
		
		case 'ROOM_CREATOR_ID': return { ...state, roomCreatorId: action.data }

		case 'WAIT_SCREEN': return { ...state, waitScreen: action.data }

		case 'CLEAR_OTHER_USER_STREAM': return { ...state, otherUserSteams:[] }

		case 'SOCKET': return { ...state, socket: action.data }

		case 'UPDATE_OTHER_USER_STREAM': return { ...state, otherUserSteams: action.data }

		case 'REQUEST_SENDER':
			let rs = [...state.requestSender];
			rs = _.reject(rs, function(item){ return item.userdata._id == action.data.userdata._id; });
			return { ...state, requestSender: [...rs,action.data] }
			
			case 'REMOVE_REQUEST_SENDER':
				let req = [...state.requestSender];
				req = req.filter(item => item.socketId != action.data.socketId);
			 return { ...state, requestSender: req }

		case 'SET_OTHER_USER_STREAM':
			let userData = action.data;
			let prevMember = [...state.otherUserSteams]
			let findInprevarr = prevMember.find(item => item.joinedUserId == userData.joinedUserId);
			let memberArr
			if(findInprevarr){
				 memberArr = [...state.otherUserSteams];	
			}else{
				 memberArr = [...state.otherUserSteams,userData];	
			}	
			return {
				...state,
				otherUserSteams: memberArr
			}

		case 'REMOVE_OTHER_USER_STREAM':
		let streamId = action.data;
		let member = [...state.otherUserSteams];	
		member = member.filter(x => x.stream.id !== streamId);
		return {
			...state,
			otherUserSteams: member
		}

		case 'USER_MUTE_UNMUTE':
			let joinedUserId = action.data.joinedUserId;
			let field = action.data.field;
			let value = action.data.value;
			let users = [...state.otherUserSteams]
			let updatemuteuser = users.map(item => 
				{
					if(item.joinedUserId == joinedUserId){
						switch(field){
							case "Video" :
								item.Video = value;
								break;
							
							case "Audio" :
								item.Audio = value;
								break;
								
							case "qualify":
								item.qualify = value;
								break;
							
							case "Speaking":
								item.speaking = value;
								break;
							}

						return item
					}else{
						return item
					}
				});	
			return {
				...state,
				otherUserSteams: updatemuteuser
			}		
			
	case 'FLUSH': 
		return initialData ;

		default: return state;
	}
}
export default socketReducers;







// case 'SET_OTHER_USER_STREAM':
// 	let userData = action.data;
// 	let prevMember = [...state.otherUserSteams,userData];	
// 	return { ...state, otherUserSteams : prevMember }