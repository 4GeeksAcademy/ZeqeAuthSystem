"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
import bcrypt


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        raise APIException("Email y contraseña son requeridos", status_code=400)

    # Verificar si el usuario existe
    user = User.query.filter_by(email=email).first()
    if not user:
        raise APIException("Credenciales inválidas", status_code=401)

    # Verificar la contraseña
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        raise APIException("Credenciales inválidas", status_code=401)

    # Generar el token JWT
    access_token = create_access_token(
        identity=str(user.id),  # Cambiamos a string
        additional_claims={"email": user.email}  # Información adicional
    )

    return jsonify({"token": access_token, "user": user.serialize()}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = get_jwt_identity()  # Obtén la identidad (ID del usuario)
    claims = get_jwt()  # Obtén las claims adicionales
    return jsonify({
        "message": f"Acceso autorizado para el usuario ID: {current_user_id}",
        "email": claims.get("email")
    }), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        raise APIException("Email y contraseña son requeridos", status_code=400)

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException("El usuario ya existe", status_code=400)

    # Cifrar la contraseña
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Crear el nuevo usuario
    new_user = User(email=email, password=hashed_password.decode('utf-8'), is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201
