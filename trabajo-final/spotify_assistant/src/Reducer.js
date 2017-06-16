const initialState = {
  user: null,
  playlistEditting: [],
  spotify: null,
  searchedTracks: [],
  localStorage: localStorage,
  change: true
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
      state.localStorage.setItem(action.playlist.name,action.playlist.tracks);
      return Object.assign({},state,{localStorage: localStorage, change: !state.change});
    case 'DELETE_LOCAL_PLAYLIST':
      state.localStorage.removeItem(action.name);
      return Object.assign({},state,{localStorage: localStorage, change: !state.change});
    case 'DELETE_PICKED_TRACK':
      let playlistEditting = state.playlistEditting;
      return Object.assign({},state,{playlistEditting: [...playlistEditting.slice(0,action.index),
                                                        ...playlistEditting.slice(action.index+1)]});
    default:
      return state;
  }
}
