import React, { Component } from 'react';
import axios from 'axios';

class UploadFile extends Component {
    state = {
        selectedFile: null
    };

    handleChange = (event) => {
        if(files) {
            formValue = files[0]; 
        } else {
            formValue = value;
        }
        this.setState({
            [event.target.name]: event.target.formValue
        });
    }

    handleSubmit = () => {
        const data = new FormData();
        data.append('file',this.state.selectedFile);
        axios.post("http://localhost:5000/upload", data)
            .then(res => {
                console.log(res.statusText);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <form>
                    <input type="file" name="file"  onChange={this.handleChange} />
                    <button type="button" onClick={this.handleSubmit}>Upload</button>
                </form>
            </div>
        );
    }
}

export default UploadFile;