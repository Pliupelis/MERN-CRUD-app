import todoReducer from "./todoReducer"
import authReducer from "./authReducer"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer
})

export default rootReducer
