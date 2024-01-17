import React, { useState } from 'react'
import { Header } from '../../components/Header/Header'
import '../CreateBreakfast/CreateBreakfast.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

const CreateBreakfast = ({history}) => {
	const [savories,setSavories] = useState([
        "Oatmeal",
        "Avocado Toast",
    ])
	const [sweets,setSweets] = useState([
        "Cookie"
    ])
	const [name, setName] = useState('Vegan Sunshine')
	const [description, setDescription] = useState('Vegan everything! Join us in a healthy breakfast full of vegan dishes and desserts')
	const [imageURL, setImageURL] = useState('https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2019/04/vegan-breakfast-bowl-portion-1000x1500.jpg')
	const [startDate, setStartDate] = useState('2022-04-08T08:00:00')
	const [endDate, setEndDate] = useState('2022-04-08T11:00:00')
	
	const addSavories = (event) =>{
		setSavories([... savories, event.target.value])
		event.target.value = ''
	}
	const removeSavories = (indexToRemove) =>{
		setSavories([...savories.filter((_, index) => index !== indexToRemove)]);
	}

	const addSweets = (event) =>{
		setSweets([... sweets, event.target.value])
		event.target.value = ''
	}
	const removeSweets = (indexToRemove) =>{
		setSweets([...sweets.filter((_, index) => index !== indexToRemove)]);
	}

	
	async function addBreakfast(e){
		e.preventDefault()
		
		let breakfast = {
			name: name,
			description: description,
			startDate: startDate,
			endDateTime: endDate,
			savory: savories,
			Sweet: sweets,
			imageURL: imageURL
		}

		try {
			const response = await axios.post('http://localhost:5090/Breakfast', breakfast, {
			  headers: { 'Content-Type': 'application/json' }
			});
		
			console.log(response);
		  } catch (error) {
			console.error(error.message);
		  }
		  window.location.href = '/'
		}
	
	
		

  return (
    <div className='create-breakfast-container'>
        <Header />
        <div className='breakfast-header-container'>
            <h3>Create New <span className='blue-highlighter'>Breakfast</span></h3>
			<Link to="/">Go back</Link>   
        </div>
        <form className="card-form" onSubmit={addBreakfast} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
			<div className="input">
				<input type="text" className="input-field" name='name' value={name} onChange={(e) => setName(e.target.value)}/>
				<label className="input-label">Name</label>
			</div>
			<div className="input">
				<input type="text" className="input-field" name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
				<label className="input-label">Description</label>
			</div>
			<div className="input">
				<input type="text" className="input-field" name='imageURL' value={imageURL} onChange={(e) => setImageURL(e.target.value)}/>
				<label className="input-label">Image Url</label>
			</div>
			<div className="input">
				<input type="datetime-local" className="input-datetime" name='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
				<label className="input-label">Start Date</label>
			</div>
			<div className="input">
				<input type="datetime-local" className="input-datetime" name='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
				<label className="input-label">End Date</label>
			</div>
			<div className='input'>
				<label className='input-label-tags'>Savories</label>
				<div className='tags-input'>
				<ul id='tags'>
				{savories.map((savories, index) => (
					<li key={index} className="tag savory-tag">
						<span className='tag-title'>{savories}</span>
						<span className='tag-close-icon'
							onClick={() => removeSavories(index)}
						>
							x
						</span>
					</li>
				))}
				</ul>
				<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addSavories(event) : null}
				placeholder="Press enter to add savories"
			/>
			</div>
			</div>
			<div className='input'>
				<label className='input-label-tags'>Sweets</label>
				<div className='tags-input'>
					<ul id='tags'>
						{sweets.map((tag, index) => (
							<li key={index} className="tag sweet-tag">
								<span className='tag-title'>{tag}</span>
								<span className='tag-close-icon'
									onClick={() => removeSweets(index)}
								>
									x
								</span>
							</li>
						))}
						</ul>
						<input
						type="text"
						onKeyUp={event => event.key === "Enter" ? addSweets(event) : null}
						placeholder="Press enter to add sweets"
						/>
				</div>
			</div>
		
			<div className="action">
				<button className="action-button" type='submit'>Create</button>
			</div>
			
		</form>
    </div>
  )
}

export default CreateBreakfast