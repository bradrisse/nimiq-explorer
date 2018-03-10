import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import HomeReducer from './homeReducer';
import BlockReducer from './blocks';
import NimiqReducer from './nimiq';

const rootReducer = combineReducers({
    form: formReducer,
    home: HomeReducer,
    nimiq: NimiqReducer,
    blocks: BlockReducer
});

export default rootReducer;