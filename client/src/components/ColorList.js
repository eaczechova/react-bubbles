import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
	color: '',
	code: { hex: '' },
};

const ColorList = ({ colors, updateColors, getData }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const [newColor, setNewColor] = useState(initialColor);

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (e) => {
		e.preventDefault();

		axiosWithAuth()
			.put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
			.then((res) => {
				let update = colors.map((color) =>
					color.id === res.data.id ? res.data : color
				);
				setEditing(false);
				updateColors(update);
			})
			.catch((err) => console.log(err));
	};

	const deleteColor = (color) => {
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${color.id}`)
			.then((res) => {
				getData();
			});
	};

	const addColor = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post('http://localhost:5000/api/colors', newColor)
			.then((res) => {
				console.log(res.data);
				getData();
			});
	};

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map((color) => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div className="color-box" style={{ backgroundColor: color.code.hex }} />
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={(e) =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={(e) =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}

			<div>
				<h3>Add more colors</h3>
				<form className="form__color" onSubmit={addColor}>
					<input
						onChange={(e) => setNewColor({ ...newColor, color: e.target.value })}
						value={newColor.color}
						placeholder="color"
					/>
					<input
						onChange={(e) =>
							setNewColor({
								...newColor,
								code: { hex: e.target.value },
							})
						}
						value={newColor.code.hex}
						placeholder="hex"
					/>
					<button>Add</button>
				</form>
			</div>
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
