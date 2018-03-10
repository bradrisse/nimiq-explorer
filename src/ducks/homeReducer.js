const initialState = {
    string: 'test',
    num: 0
}

export default function HomeReducer(store = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case 'TEST' : {
            return {
                ...store,
                new: payload
            };
        }

        default: {
            return store;
        }
    }
}