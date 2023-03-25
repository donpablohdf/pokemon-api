import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // version 6.4.2
import injectContext from './store/appContext.js';
import App from "./App.js";

const Layout = () => {
	// const basename se usa cuando su proyecto se publica en un subdirectorio y no en la raíz del dominio
	// puede establecer el nombre base en el archivo .env ubicado en la raíz de este proyecto, por ejemplo: BASENAME=/subdirectorio-publicacion/

	const basename =  "/";

	return (
		<>
			<BrowserRouter basename={basename} >
				<App path='/' />
			</BrowserRouter>
		</>
	);
};

export default injectContext(Layout);