export const ADD_RECIPE = 'ADD_RECIPE';
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR';

// action to add recipe
// arguments include day, recipe and meal
export const addRecipe = ({day, recipe, meal}) => {
    return {
        type: ADD_RECIPE,
        recipe,
        day,
        meal,
    }
}

// action to remove meal from calendar
// arguments include recipe and meal
export const removeFromCalendar = ({day, meal}) => {
    return {
        type: REMOVE_FROM_CALENDAR,
        day,
        meal,
    }
}