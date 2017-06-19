import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  user: null,
  playlistEditting: [],
  spotify: null,
  searchedTracks: [],
  localPlaylist: [],
};

export default function reducer(state = initialState,action) {
  switch (action.type) {
    case 'REFRESH_EDITTING':
      return Object.assign({},state,{playlistEditting: []});
    case 'SPOTIFY':
      return Object.assign({},state,{spotify: action.spotify});
    case 'ADD_USER_DATA':
      return Object.assign({},state,{user: action.user});
    case 'NEW_SEARCH':
      return Object.assign({},state,{searchedTracks: action.tracks});
    case 'ADD_TRACK_TO_PLAYLIST':
      return Object.assign({},state,{playlistEditting: [...state.playlistEditting, action.track]});
    case 'ADD_PLAYLIST_TO_LOCAL':
      return Object.assign({},state,{localPlaylist:[...state.localPlaylist,action.playlist]});
    case 'DELETE_LOCAL_PLAYLIST':
      let index = 0;
      for(index in state.localPlaylist){
        if(state.localPlaylist[index].name === action.name){
          break;
        }
      }
      return Object.assign({},state,{localPlaylist: [...state.localPlaylist.slice(0,index),
                                                     ...state.localPlaylist.slice(index+1)]});
    case 'DELETE_PICKED_TRACK':
      let playlistEditting = state.playlistEditting;
      return Object.assign({},state,{playlistEditting: [...playlistEditting.slice(0,action.index),
                                                        ...playlistEditting.slice(action.index+1)]});
    case 'CLEAR_SEARCH':
      return Object.assign({},state,{searchedTracks: []});
    case REHYDRATE:
      return Object.assign({},state,{localPlaylist: action.payload.localPlaylist});
    default:
      return state;
  }
}
