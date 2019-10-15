import React, { Component } from 'react';
class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'error': {},
            'submit': {},
            'formSubmitted': false
        }
        this.formSubmitted = false;
        this.handleChange = this.handleChange.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ 'formSubmitted': true });
    }
    checkValidation(elem) {
        const { name, value } = elem;
        const nameRegEx = new RegExp("(^[a-zA-Z]{1,}\\s{1}[a-zA-Z]{1,}$)");

        switch (name) {
            case 'name': {
                return !nameRegEx.test(value);
            }
            case 'dob': {
                let currentDate = new Date();
                let selectedDate = new Date(value);
                return (selectedDate > currentDate);
            }
            default: return false;
        }


    }
    handleChange(e) {
        let { name, value, required } = e.target;
        value = (name === 'gender') ? value = +value : value;
        let error = (required) ? this.checkValidation(e.target) : false;

        this.setState(prevState => ({
            'formSubmitted': false,
            'submit': {
                ...prevState.submit,
                [name]: value
            },
            'error': {
                ...prevState.error,
                [name]: error
            }
        }));
    }
    render() {
        let FormData = this.props.formdata;
        return <div  data-testid="outerDiv" key="form-heading-div">
            {this.state.formSubmitted && <h1> Form Submitted Successfully!! </h1>}
            <h2 data-testid="heading"> Contact Form
            </h2>
            <p className="Form-sub-heading" key="form-sub-heading">
                Please fill out all the required details!
            </p>
            <form autoComplete="off" data-testid="form" name="MyForm">
                {Object.keys(FormData).map((InputType, index) => {
                    let { type, required, label, options } = FormData[InputType];
                    switch (InputType) {
                        case 'name':
                            return <div key={'div' + index} className="Form-field">
                                <label key={'label' + index} className="Form-label">
                                    {label}{required ? '*' : ''} :
                                 </label>
                                <input
                                    type={type}
                                    name={InputType}
                                    key={index}
                                    className="Form-text"
                                    required={required}
                                    value={this.state.submit[InputType] || ''}
                                    onChange={this.handleChange}
                                />
                                {this.state.error[InputType] &&
                                    <p className='Form-error'>** Please enter Full Name as "Firstname Lastname"!</p>
                                }
                            </div>
                        case 'dob':
                            return <div key={'div' + index} className="Form-field">
                                <label key={'label' + index} className="Form-label">
                                    {label}{required ? '*' : ''} :
                                                </label>
                                <input
                                    type={type}
                                    name={InputType}
                                    key={index}
                                    className="Form-text"
                                    required={required}
                                    value={this.state.submit[InputType] || ''}
                                    onChange={this.handleChange}
                                />
                                {this.state.error[InputType] &&
                                    <p className='Form-error'>** Date Of Birth must be lesser than the current date!</p>
                                }
                            </div>
                        case 'gender':
                            return <div key={'div' + index} className="Form-field">
                                <label key={'label' + index} className="Form-label">
                                    {label}{required ? '*' : ''} :
                                                </label>
                                {
                                    options.map((opt, keyopt) => {
                                        return <span key={opt}><input
                                            type={type}
                                            name={InputType}
                                            key={index}
                                            className="Form-text"
                                            required={required}
                                            value={keyopt}
                                            onChange={this.handleChange}
                                        />
                                            <label>{opt}</label>
                                        </span>
                                    })}
                                {this.state.error[InputType] &&
                                    <p className='Form-error'>** Date Of Birth must be greater than the current date!</p>
                                }
                            </div>
                        default: return null;
                    }
                })
                }
                <input data-testid="submit" type="submit"
                    name="submit"
                    className={'Form-submit-button'}
                    onClick={this.handleSubmit} />
            </form>
        </div>

    }

}

export default MyForm;