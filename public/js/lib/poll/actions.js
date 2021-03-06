import db from '../repositories/db';
import {mapProperties, mapPropertiesForSinglePoll} from './poll.service';
import R from 'ramda';
import {browserHistory} from 'react-router';

export const REQUEST_POLLS = 'REQUEST_POLLS';
export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const CHANGE_STEP_START = 'CHANGE_STEP_START';
export const CHANGE_STEP_FAILED = 'CHANGE_STEP_FAILED';
export const CHANGE_STEP_FINISHED = 'CHANGE_STEP_FINISHED';
export const CHANGE_LOCATION = '@@router/LOCATION_CHANGE';
export const FETCH_ANSWER_START = 'FETCH_ANSWER_START';
export const FETCH_ANSWER_SUCCESS = 'FETCH_ANSWER_SUCCESS';
export const FETCH_ANSWER_FAILED = 'FETCH_ANSWER_FAILED';
export const FETCH_POLL_START = 'FETCH_POLL_START';
export const FETCH_POLL_SUCCESS = 'FETCH_POLL_SUCCESS';
export const FETCH_POLL_FAILED = 'FETCH_POLL_FAILED';
export const CHANGE_POLL_PROPERTY = 'POLL_CHANGE_PROPERTY';
export const SAVE_POLL_START = 'SAVE_POLL_START';
export const SAVE_POLL_SUCCESS = 'SAVE_POLL_SUCCESS';
export const SAVE_POLL_FAILED = 'SAVE_POLL_FAILED';
export const STEP_SET = 'STEP_SET';
export const TOGGLE_AUTO_SWITCH = 'TOGGLE_AUTO_SWITCH';
export const NOTIFICATION_DISPLAYED = 'NOTIFICATION_DISPLAYED';

export function savePollStart() {
    return {
        type: SAVE_POLL_START
    };
}

export function savePollSuccess(options) {
    return {
        type: SAVE_POLL_SUCCESS,
        options: options
    };
}

export function notificationHasBeenDisplayed() {
    return {
        type: NOTIFICATION_DISPLAYED
    };
}

/** START poll save results or clear them **/
export const POLL_RESULTS_NAME_CHANGE = 'POLL_RESULTS_NAME_CHANGE';
export const POLL_RESULTS_NAME_SAVE_START = 'POLL_RESULTS_NAME_SAVE_START';
export const POLL_RESULTS_NAME_SAVE_FINISHED = 'POLL_RESULTS_NAME_SAVE_FINISHED';
export const POLL_RESULTS_NAME_SAVE_FAILED = 'POLL_RESULTS_NAME_SAVE_FAILED';
export const POLL_RESULTS_CHANGE = "POLL_RESULTS_CHANGE";
export const POLL_RESULTS_CLEAR_START = 'POLL_RESULTS_CLEAR_START';
export const POLL_RESULTS_CLEAR_FINISHED = 'POLL_RESULTS_CLEAR_FINISHED';
export const POLL_RESULTS_CLEAR_FAILED = 'POLL_RESULTS_CLEAR_FAILED';

export function pollResultClearStart() {
    return {
        type: POLL_RESULTS_CLEAR_START
    }
}

export function pollResultClearFinished() {
    return {
        type: POLL_RESULTS_CLEAR_FINISHED
    }
}

export function pollResultClearFailed() {
    return {
        type: POLL_RESULTS_CLEAR_FAILED
    }
}

export function pollResultClearStartAsync() {
    return function (dispatch, getState) {
        var pollId = getState().polls.poll.id;

        dispatch(pollResultClearStart());

        return db.poll.clearPollResults(pollId)
            .then(() => dispatch(fetchPoll(pollId)))
            .then(() => dispatch(pollResultClearFinished()))
            .catch(() => dispatch(pollResultClearFailed()))
    }
}

export function action(type, value) {
	return { type : type, value: value}
}

export const DELETE_PREVIOUS_RESULT = {
	START: 'DELETE_PREVIOUS_RESULT_START',
	SUCCESS: 'DELETE_PREVIOUS_RESULT_SUCCESS',
	FAIL: 'DELETE_PREVIOUS_RESULT_FAIL',
	run: resultId => (dispatch, getState) => {
		var pollId = getState().polls.poll.id;

		dispatch(action(DELETE_PREVIOUS_RESULT.START));

		return db.poll.deleteResult(pollId, resultId)
			.then(() => dispatch(fetchPoll(pollId)))
			.then(() => dispatch(action(DELETE_PREVIOUS_RESULT.SUCCESS)))
			.catch(() => dispatch(action(DELETE_PREVIOUS_RESULT.FAIL)))
	}
};

export function pollResultsNameChange(name) {
    return {
        type: POLL_RESULTS_NAME_CHANGE,
        value: name
    }
}

export function savePollResultsNameStart() {
    return {
        type: POLL_RESULTS_NAME_SAVE_START
    }
}

export function savePollResultsNameFailed() {
    return {
        type: POLL_RESULTS_NAME_SAVE_FAILED
    }
}

export function savePollResultsNameFinished() {
    return {
        type: POLL_RESULTS_NAME_SAVE_FINISHED
    }
}

export function saveResultsNameAsync() {
    return function (dispatch, getState) {
        var state = getState();
        var pollId = state.polls.poll.id;
        var resultName = state.polls.poll.resultsName;

        dispatch(savePollResultsNameStart());

        return db.poll.savePollResults(pollId, resultName)
            .then(() => dispatch(savePollResultsNameFinished()))
            .then(() => dispatch(fetchPoll(pollId)))
            .catch(() => dispatch(savePollResultsNameFailed()));
    }
}

export function changePollResults(resultName) {
    return {
        type: POLL_RESULTS_CHANGE,
        value: resultName
    }
}
/** FINISH poll save results or clear them **/

export function savePollFailed(reason) {
    return {
        type: SAVE_POLL_FAILED,
        reason: reason
    };
}

export function toggleAutoSwitch(value) {
    return {
        type: TOGGLE_AUTO_SWITCH,
        value: value
    };
}

function requestPolls() {
    return {
        type: REQUEST_POLLS
    };
}

function receivePolls(polls) {
    return {
        type: RECEIVE_POLLS,
        polls
    };
}

function fetchAnswerStart(parent, poll) {
    return {
        type: FETCH_ANSWER_SUCCESS,
        parent: parent,
        poll
    };
}

function fetchAnswerSuccess(pollName, answers) {
    return {
        type: FETCH_ANSWER_SUCCESS,
        pollName: pollName,
        answers: answers
    };
}

function fetchAnswerFailed(pollName) {
    return {
        type: FETCH_ANSWER_START,
        pollName: pollName
    };
}

function fetchPollStart(pollName) {
    return {
        type: FETCH_POLL_START,
        pollName: pollName
    };
}

export function fetchPollSuccess(poll) {
    return {
        type: FETCH_POLL_SUCCESS,
        poll: poll
    };
}

function fetchPollFailed(reason) {
    return {
        type: FETCH_POLL_FAILED,
        reason: reason
    };
}

function changeStepStart() {
    return {
        type: CHANGE_STEP_START
    };
}

function changeStepFinished() {
    return {
        type: CHANGE_STEP_FINISHED
    };
}

function changeStepFailed(reason) {
    return {
        type: CHANGE_STEP_FAILED,
        reason: reason
    };
}

function justChangeStep(pollName, step) {
    return {
        type: STEP_SET,
        pollName: pollName,
        step: step
    };
}

function moveUserToInteractions(moveToDashBoard) {
    if (moveToDashBoard === false) {
        return;
    }
    browserHistory.push('/interaction');
}

export const setStep = (pollId, step) => {
    return function (dispatch, getState) {
        var state = getState();

        dispatch(justChangeStep(pollId, step));

        if (state.polls.poll.autoSwitch) {
            dispatch(changeStep(pollId, step, true, state.polls.poll.parent));
        }
    };
};

export function propertyChange(options) {
    return {
        type: CHANGE_POLL_PROPERTY,
        propertyPath: options.propertyPath,
        newValue: options.data
    };
}

function isNotSuccessFullResponse(response) {
    return response.status !== 200;
}

export function changeStep(pollId, selectedStep, stay, parent) {
    return function (dispatch) {
        dispatch(changeStepStart());

        return db.step.changeStep(parent, pollId, selectedStep, stay)
            .then(response => {
                if (isNotSuccessFullResponse(response)) {
                    return dispatch(changeStepFailed());
                }
                dispatch(changeStepFinished());
            });
    };
}

function fetchPolls() {
    return function (dispatch) {
        dispatch(requestPolls());

        return db.poll.getPolls()
            .then(response => response.json())
            .then(mapProperties)
            .then(polls => dispatch(receivePolls(polls)))
            .catch(() => dispatch(receivePolls([])));
    };
}

export function fetchAnswers(pollName) {
    return dispatch => {
        dispatch(fetchAnswerStart(pollName));

        return db.poll.getAnswers(pollName)
            .then(response => response.json())
            .then(answers => dispatch(fetchAnswerSuccess(pollName, answers)))
            .catch(error => dispatch(fetchAnswerFailed(error)));
    };
}

export function fetchPoll(pollId) {
    return dispatch => {
        dispatch(fetchPollStart(pollId));

        return db.poll.getPoll(pollId)
            .then(response => response.json())
            .then(mapPropertiesForSinglePoll)
            .then(poll => dispatch(fetchPollSuccess(poll)))
            .catch(error => dispatch(fetchPollFailed(error)));
    };
}

export function fetchPollsIfNeeded() {
    return dispatch => dispatch(fetchPolls());
}

export function savePoll(options) {
    return (dispatch, getState) => {
        var poll = getState().polls.poll;
        var data = R.view(R.lensPath(options.propertyPath.split('.')), poll.modifications);

        dispatch(savePollStart());

        return db.poll.savePoll(poll.id, data, options.restPath)
            .then(() => dispatch(savePollSuccess(options)))
            .then(() => moveUserToInteractions(options.moveToDashBoard))
            .catch(error => dispatch(savePollFailed(error)));
    };
}

export function changePropertyAndSave(options) {
    return dispatch => {
        dispatch(propertyChange(options));

        return dispatch(savePoll(options));
    };
}