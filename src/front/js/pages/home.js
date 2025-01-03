import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card shadow-lg border-0">
						<div className="card-body text-center">
							<h1 className="card-title mb-4">¡Gracias 4Geeks Academy!</h1>
							<p className="card-text fs-5">
								Quiero expresar mi más sincero agradecimiento a mis instructores <strong>Arnaldo</strong> y <strong>Cristian</strong> <br></br>
								por su dedicación, paciencia y constante apoyo durante este increíble proceso de aprendizaje.
							</p>
							<p className="card-text fs-5">
								Gracias por transmitirnos no solo conocimientos técnicos, sino también el entusiasmo y la pasión por el desarrollo web.
								Estoy profundamente agradecido por su guía en este camino.
							</p>
							<img
								src="https://media.giphy.com/media/l0HUpt2s9Pclgt9Vm/giphy.gif"
								alt="Gracias"
								className="img-fluid rounded"
							/>
							<p className="mt-4">
								<em>¡Gracias por ser parte de nuestro crecimiento profesional!</em>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
