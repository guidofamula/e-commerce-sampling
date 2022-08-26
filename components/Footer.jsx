import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
	return (
		<div className="footer-container">
			<p className="icons">
				<AiFillInstagram />
				<AiOutlineTwitter />
			</p>
			<p>2022 Ladola Store - All rights reserved</p>
		</div>
	)
}

export default Footer