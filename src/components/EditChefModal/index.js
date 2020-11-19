import React from 'react'

export default function EditChefModal(props) {
    return (
        <form onSubmit={props.handleFormSubmit}>
            <input onChange={props.handleInputChange} value={props.chef.first} type="text" name="first" placeholder="First"/>
            <input onChange={props.handleInputChange} value={props.chef.last} type="text" name="Last" />
        <input type="submit" value="submit!"/>
    </form>
    )
}