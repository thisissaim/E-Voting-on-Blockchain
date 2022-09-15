import emailjs from "@emailjs/browser";
import React, { useRef, useState } from 'react';
import './Login.css'


var globalOtp ,globalValue;

const Login = () => {
	let disableotp = false;
	const generateOTP = () => {
		let OTP = "";
		for (let i = 0; i < 6; i++) {
			OTP += Math.floor(Math.random() * 10);
		}

		return Number(OTP)
	};

	const inputArr = [
		{
			type: "text",
			id: 1,
			value: ""
		}
	];

	const dataSubmit = () => {
		return checked ? setIsDisabled(true) : setIsDisabled(false);
	};

	const onSubmitClick = () => {
		setChecked(!checked);
		return dataSubmit();
	};


	const form = useRef();
	const [username, setusername] = useState("")
	const [pass , setpass] = useState("")
	const [email, setemail] = useState("")
	const [otp, setotp] = useState(generateOTP())
	const [arr, setArr] = useState(inputArr);
	const [isDisabled, setIsDisabled] = useState(true);
	const [checked, setChecked] = useState(false)



	// console.log("generateOTP  ",generateOTP());

	const sendEmail = (e) => {
		e.preventDefault();

		let Otp = generateOTP();
		globalOtp = Otp;
		console.log(Otp)
		setotp(Otp)
		var templateParams = {
			name: username,
			email: email,
			OTP: Otp
		};
		console.log(templateParams)
		emailjs.send('service_d07z4xm', 'template_foagdkh', templateParams, 'jFHI6zJ-TkvVdXe-g')
			.then((result) => {
				// console.log(result.text);
			}, (error) => {
				console.log(error.text);
			});
	};
console.log(globalOtp);


	const addInput = () => {
		setArr(s => {
			return [
				...s,
				{
					type: "text",
					value: ""
				}
			];
		});
	};

	const handleChange = e => {
		e.preventDefault();

		const index = e.target.id;
		setArr(s => {
			const newArr = s.slice();
			newArr[index].value = e.target.value;

			return newArr;
		});
	};



	return (
		<div>
			<form className="box" ref={form} >
				<label>Name</label>
				<input type="text" name="user_name" onChange={(e) => setusername(e.target.value)} value={username} />
				<label>Password</label>
				<input type="password" name="pass" onChange={(e) => setpass(e.target.value)} value={pass} />
				<label>Email</label>
				<input type="email" name="user_email" onChange={(e) => setemail(e.target.value)} value={email} />
				<input type="submit"
					value="Generate OTP"
					onClick={sendEmail} name="otp" />

				<button onClick={addInput}>Enter OTP</button>
				{arr.map((item, i) => {
					return (
						<input
							onChange={handleChange}
							value={item.value}
							globalValue={item.value}
							id={i}
							type={item.type}
							size="40"
							// disabled = {item.value===globalOtp ? false : true}
							
						/>
					);
				})}
				<input type="submit"
				 onClick={onSubmitClick}
				 disabled = {globalValue===globalOtp ? false : true} />
				
			</form>

		</div>
	)
}




export default Login