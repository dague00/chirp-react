export const CHIRPS_LOADING = "CHIRPS_LOADING";
export const CHIRPS_FAIL = "CHIRPS_FAIL";
export const CHIRPS_SUCCESS = "CHIRPS_SUCCESS";

export type ChirpsType = [{
    username: {S: string},
    body: {S: string},
    timestamp: {S: string},
    likes: {L: [{S: string}]},
    img: {S: string}
}]

export type Chirps = {
    username: string,
    body: string
}
export interface ChirpsLoading {
    type: typeof CHIRPS_LOADING
}

export interface ChirpsFail {
    type: typeof CHIRPS_FAIL
}

export interface ChirpsSuccess {
    type: typeof CHIRPS_SUCCESS,
    payload: ChirpsType
}

export type ChirpsDispatchTypes = ChirpsLoading | ChirpsFail | ChirpsSuccess;