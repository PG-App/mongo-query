import React, { useState } from 'react';
import OtpVerify from './otpVerify';
import PhoneInput from './phoneInput';
import './style.css';

const StepForm = () => {
	const [state, setState] = useState({
		phone: '',
		code: '',
		username: ''
	});

	const [step, setStep] = useState(1)

	const handleChange = (input) => (e) => {
		setState({ ...state, [input]: e.target.value });
	};

	const nextStep = () => {
		setStep(prevStep => prevStep + 1)
	};

	const prevStep = () => {
		setStep(prevStep => prevStep - 1)
	};

	const { phone, code, username } = state;
	const value = { phone, code, username };

	switch (step) {
		case 1:
			return <PhoneInput nextStep={nextStep} handleChange={handleChange} value={value} />;
		case 2:
			return <OtpVerify nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} value={value} />;
		default:
			return <PhoneInput nextStep={nextStep} handleChange={handleChange} value={value} />

	}
};

export default StepForm;