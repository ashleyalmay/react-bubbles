import React, { useState } from "react";
import { useHistory} from 'react-router-dom';
import { axiosWithAuth } from "../Utils/axiosWithAuth";



const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(updateColors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  
  const history = useHistory();
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
// this works if you refresh window.location.reload(); got it
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      
    history.push(`/protected`)
    window.location.reload();
    })
    .catch(err => {
        console.log(err)
        setTimeout(history.push(`/protected`), 10000)
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };


  const deleteColor = colorToDelete => {
    console.log(colorToDelete)
    
    // make a delete request to delete this color
  axiosWithAuth()
    .delete(`api/colors/${colorToDelete.id}`)
    .then((res) => {
      console.log(res);
      
      history.push('/protected');
      window.location.reload();
    })
    .catch((err) => console.error({ err }));
  setTimeout(history.push('/protected'), 10000);
    };
    // this works on refresh added this it works window.location.reload();

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
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
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
