// action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

// action creators
export function setMovies(value) {
	return { 
		type: SET_MOVIES,
		value
	}
}

export function setFilter(value) {
	return {
		type: SET_FILTER,
		value
	}
}

export function setUser(user) {
	return {
		type: SET_USER,
		user
	}
}

export function updateUser(value) {
	return {
		type: UPDATE_USER,
		value
	}
}