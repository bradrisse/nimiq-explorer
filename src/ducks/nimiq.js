export const types = {
    UPDATE_HEIGHT: "UPDATE_HEIGHT",
    UPDATE_CONSENSUS: "UPDATE_CONSENSUS"
};

export const initial = {
    height: 0,
    consensusEstablished: false
};

export default function(state = initial, action) {
    switch (action.type) {
        case `${types.UPDATE_HEIGHT}`:
            return { ...state, height: action.payload };

        case `${types.UPDATE_CONSENSUS}`:
            return { ...state, consensusEstablished: action.payload };

        default:
            return state;
    }
}

export const actions = {
    updateHeight: data => ({
        type: types.UPDATE_HEIGHT,
        payload: data
    }),
    updateConsensus: data => ({
        type: types.UPDATE_CONSENSUS,
        payload: data
    })
};
