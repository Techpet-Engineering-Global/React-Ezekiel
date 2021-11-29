import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addRecipe, removeFromCalendar} from '../actions';
import { capitalize } from '../utils/Helper';
import {FaRegCalendarPlus} from 'react-icons/fa';
import {FaArrowRight} from 'react-icons/fa';
import Modal from 'react-modal';
import Loading from 'react-loading';
import {fetchRecipes} from '../utils/Api';
import FoodList from './FoodList';
import ShoppingList from './ShoppingList'

class App extends Component {

state = {
  foodModalOpen: false,
  meal: null,
  day: null,
  food: null,
  loadingFood: false,
  ingredientsModalOpen: false
}

// function to open food Modal
openFoodModal = ({meal, day}) => {
  this.setState(() => ({
     // setting state of Modal, meal and day
    foodModalOpen: true,
    meal,
    day,
  }))
}

// function to close food modal
closeFoodModal = () => {
  this.setState(() => ({
    // setting state of Modal, meal, day and food
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null
  }))
}

// function to fetch recipe from API 
searchFood = (e) => {
  if (!this.input.value) {
    return 
  }
  e.preventDefault();
  this.setState(() => ({loadingFood: true}))

  fetchRecipes(this.input.value)
    .then((food) => this.setState(() => ({
      food,
      loadingFood: false
  })))
}

// function to close ingredient modal
openIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: true }))

// function to close ingredient modal
closeIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: false }))

// function to generate shopping list
generateShoppingList = () => {
    return this.props.calendar.reduce((result, { meals }) => {
      const { breakfast, lunch, dinner } = meals

      breakfast && result.push(breakfast)
      lunch && result.push(lunch)
      dinner && result.push(dinner)

      return result
    }, [])
    // reduce all meals into a single array of ingredients
    .reduce((ings, { ingredientLines }) => ings.concat(ingredientLines), [])
  }

  render() {
    const {foodModalOpen, loadingFood, food, ingredientsModalOpen} = this.state;
    // calling the values of Calendar state from mapStateToProps
    // calling the value of removeFromCalendar action from MapDispatchToProps
    const { calendar, remove, selectRecipe } = this.props
    
    const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className='container'>
        <div className='nav'>
          <h1 className='header'> Udacimeals </h1>
          <button
          className='shopping-list'
          onClick={this.openIngredientsModal}>
            Shopping List
          </button>
        </div>

      <ul className='meal-types'>
        {mealOrder.map((mealType) => (
          <li key={mealType} className='subheader'>
            {capitalize(mealType)}
          </li>
        ))}
      </ul>

      <div className='calendar'>
        <div className='days'>
          {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
        </div>
        <div className='icon-grid'>
          {calendar.map(({ day, meals }) => (
            <ul key={day}>
              {mealOrder.map((meal) => (
                <li key={meal} className='meal'>
                  {/* code to return meal image if there is a data on the meal or simply return calendar icon if there isnt */}
                  {meals[meal]
                    ?
                    <div className='food-item'>
                        <img src={meals[meal].image} alt={meals[meal].label}/>
                       {/* function to dispatch removeFromCalendar action to remove meal and day */}
                        <button onClick={() => remove({meal, day})}>Clear</button>
                      </div>
                    : 
                    //  function to open food modal and add meal
                    <button onClick={() => this.openFoodModal({meal, day})} className='icon-btn'>
                        <FaRegCalendarPlus size={30}/>
                      </button>}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Creating the foodModal  */}
      <Modal
          className='modal'
          overlayClassName='overlay'
          // Modal is open when foodModalOpen  is true
          isOpen={foodModalOpen}
          // Modal is open when closeFoodModal is true
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div>
            {loadingFood === true
              ?
              // spinner loads if LoadingFood is true 
              <Loading delay={200} type='spin' color='#222' className='loading' />
              :
              //  loads when loadingFood is false
              <div className='search-container'>
                  <h3 className='subheader'>
                    {/* finds a meal for the day and meal using the input value */}
                    Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                  </h3>
                  <div className='search'>
                    <input
                      className='food-input'
                      type='text'
                      placeholder='Search Foods'
                      ref={(input) => this.input = input}
                    />
                    {/* onCLick function to search for food based on input */}
                    <button
                      className='icon-btn'
                      onClick={this.searchFood}>
                        <FaArrowRight size={30}/>
                    </button>
                  </div>
                  {food !== null && (
                    // loading FoodList component
                    <FoodList
                      // setting food state to the value of food
                      food={food}
                      onSelect={(recipe) => {
                        // function to dispatch addRecipe action to add meal and day
                        selectRecipe({ recipe, day: this.state.day, meal: this.state.meal })
                        this.closeFoodModal()
                      }}
                    />)}
                </div>}
          </div>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={ingredientsModalOpen}
          onRequestClose={this.closeIngredientsModal}
          contentLabel='Modal'
        >
          {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
        </Modal>
    </div>
      )
  }
}

// using mapStateToProps to get access to states
function mapStateToProps({calendar, food}) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return {
    // transforming calendar state from objects to an array of object
    calendar: dayOrder.map((day) => ({
      day,
      // code to reduce the calendar objects using meal as a reduction criteria
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        // code to check if the value of meal is undefined and 
        // if undefined return null
        meals[meal] = calendar[day][meal]
        ? food[calendar[day][meal]]
        : null

        return meals
      }, {})
    }))
  }
}

// using mapDispatchToProps to dispatch actions using action creators 
function mapDispatchToProps(dispatch) {
  return {
    // using action creators (method) to dispatch addRecipe and removeFromCalendar actions
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)