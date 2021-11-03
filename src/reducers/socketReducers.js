import { data } from 'jquery';
import _, { values } from 'underscore';


const initialData = {
    joinRoomReq:false,
	isModerator:false,
	waitScreen:false,
	roomCreatorId:"",
	otherUserSteams:[],
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
						if(field == "Video"){
							item.Video = value
						}else if(field == "Audio"){
							item.Audio = value
						}else{
							item.qualify = value
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
		



		default: return state;
	}
}
export default socketReducers;







// case 'SET_OTHER_USER_STREAM':
// 	let userData = action.data;
// 	let prevMember = [...state.otherUserSteams,userData];	
// 	return { ...state, otherUserSteams : prevMember }