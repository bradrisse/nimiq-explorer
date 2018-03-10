export const types = {
    FETCH_LATEST_BLOCKS: "FETCH_LATEST_BLOCKS",
    FETCH_BLOCK: "FETCH_BLOCK",
    FETCH_STATISTICS: "FETCH_STATISTICS",
    FETCH_ACCOUNT: "FETCH_ACCOUNT"
};

export const initial = {
    latest: [],
    single: null,
    statistics: [],
    account: null
};

export default function(state = initial, action) {
    switch (action.type) {
        case `${types.FETCH_LATEST_BLOCKS}_SUCCESS`:
            return { ...state, latest: action.payload.data };
        case `${types.FETCH_LATEST_BLOCKS}_FAILURE`:
            console.error('FETCH_LATEST_BLOCKS FAIL');
            return { ...state, latest: [] };

        case `${types.FETCH_BLOCK}_SUCCESS`:
            console.log('FETCH_BLOCK ', action.payload)
            return { ...state, single: action.payload.data };
        case `${types.FETCH_BLOCK}_FAILURE`:
            console.error('FETCH_BLOCK FAIL');
            return { ...state, single: null };

        case `${types.FETCH_STATISTICS}_SUCCESS`:
            console.log('FETCH_STATISTICS ', action.payload)
            return { ...state, statistics: action.payload.data };
        case `${types.FETCH_STATISTICS}_FAILURE`:
            console.error('FETCH_BLOCK FAIL');
            return { ...state, statistics: null };

        case `${types.FETCH_ACCOUNT}_SUCCESS`:
            console.log('FETCH_ACCOUNT ', action.payload)
            return { ...state, account: action.payload.data };
        case `${types.FETCH_ACCOUNT}_FAILURE`:
            console.error('FETCH_ACCOUNT FAIL');
            return { ...state, account: null };

        default:
            return state;
    }
}

export const actions = {
    fetchLatestBlocks: data => ({
        type: types.FETCH_LATEST_BLOCKS,
        payload: {
            request:{
                url:'/blocks/latest'
            }
        }
    }),
    fetchStatistics: (type, range) => ({
        type: types.FETCH_STATISTICS,
        payload: {
            request:{
                url:`/Blocks/statistics/${type}/${range}`
            }
        }
    }),
    fetchBlock: height => ({
        type: types.FETCH_BLOCK,
        payload: {
            request:{
                url:`/Blocks/${height}`,
                type: 'GET',
                params: {
                    filter: {
                        include: 'transactions'
                    }
                }
            }
        }
    }),
    fetchAccount: address => ({
        type: types.FETCH_ACCOUNT,
        payload: {
            request:{
                url:`/Accounts/${address}`,
                type: 'GET',
                params: {
                    filter: {
                        include: ['blocks', 'transactions']
                    }
                }
            }
        }
    })
};
