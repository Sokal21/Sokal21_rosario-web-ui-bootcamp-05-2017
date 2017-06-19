export function addSpotify(spotify) {
  return {type: 'SPOTIFY',
          spotify: spotify};
};

export function addUserData(userData) {
  return {type: 'ADD_USER_DATA',
          user: userData};
};

export function refreshSearchedTrack(tracks) {
  return {type: 'NEW_SEARCH',
          tracks: tracks};
};

export function addTrackToPlaylist(track) {
  return {type: 'ADD_TRACK_TO_PLAYLIST',
          track: track};
}

export function refreshPlaylistEditting() {
  return {type: 'REFRESH_EDITTING'};
};

export function addPlaylistToLocalStorage(playlist) {
  return {type: 'ADD_PLAYLIST_TO_LOCAL',
          playlist: playlist};
};

export function deleteLocalPlaylist(name) {
  return {type: 'DELETE_LOCAL_PLAYLIST',
          index: name};
};

export function deletePickedTrack(index) {
  return {type: 'DELETE_PICKED_TRACK',
          index: index};
};

export function clearSearch() {
  return {type: 'CLEAR_SEARCH'};
}
