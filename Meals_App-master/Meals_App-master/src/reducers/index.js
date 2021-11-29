import {combineReducers} from 'redux'
import {
    ADD_RECIPE,
    REMOVE_FROM_CALENDAR
} from '../actions';

// food reducer function
const food = (state = {}, action) => {
    switch (action.type) {
        case ADD_RECIPE: 
        const {recipe} = action;
        return {
            ...state,
            // modify recipe
            [recipe.label]: recipe
        }
        default:
            return state
    }
}

const initialCalendarState = {
    sunday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    monday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    tuesday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    wednesday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    thursday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    friday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    saturday:{
        breakfast: null,
        lunch: null,
        dinner: null,
    },
}

// calendar reducer function
const calendar = (state = initialCalendarState, action) => {
    const {day, recipe, meal} = action;

    // switch statement to either add recipe or remove from calendar
    switch (action.type) {
        case ADD_RECIPE:
            return {
                // return state
                ...state,
                // modify day 
                [day]: {
                    // return day
                    ...state[day],
                    // modify meal
                    [meal]: recipe.label,
                }
            };
        case REMOVE_FROM_CALENDAR:
            return {
                 // return state
                ...state,
                // modify day 
                [day]: {
                    // return day
                    ...state[day],
                    // set meal to null
                    [meal]: null
                }
            };
        default:
            return state;
    }
}

export default combineReducers ({
    calendar,
    food
}) 