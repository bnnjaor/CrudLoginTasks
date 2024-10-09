import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config.js";
//creamos funcion para registar usuarios
export const register = async (req, res) => {
  //recibimos el email,password y username de la request(solicitud)
  const { email, password, username } = req.body;

  //hacemos un trycatch por si llega haber un error
  try {
    const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json(["The email already exists"]);

    //utilizamos la libreria bcryptjs para encriptar la contraseña
    const passwordHashs = await bcrypt.hash(password, 10);

    //creamos nuevo usuario y le asignamos los datos de la request
    const newUser = new User({
      username,
      email,
      password: passwordHashs,
    });

    //guardamos el nuevo usuario en la base de datos
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      message: "User registered successfully",
      id: userSaved._id,
      email: userSaved.email,
      username: userSaved.username,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "hubo un error" + error });
  }
};

export const login = async (req, res) => {
  //recibimos el email,password y username de la request(solicitud)
  const { email, password } = req.body;

  //hacemos un trycatch por si llega haber un error
  try {
    //buscamos el usuario con su email en la bbdd
    const userFound = await User.findOne({ email });

    //si no se encuentra un usuario se retorna un status 400
    if (!userFound) return res.status(400).json({ message: "User not found" });

    //utilizamos la libreria bcryptjs para comparar la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);

    //si no coincide la contraseña se retorna un status 400
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password" });

    //guardamos el nuevo usuario en la base de datos
    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "hubo un error" + error });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ ok: false, message: "User not found" });

  return res.status(200).json({
    id: userFound._id,
    email: userFound.email,
    username: userFound.username,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ok:false, message: "Unauthorized"})

  jwt.verify(token, TOKEN_SECRET, async(err, user)=>{
    if(err) return res.status(401).json({ok:false, message: 'Unauthorized'})

    const userFound = await User.findById(user.id)
    if(!user) return res.status(401).json({ok:false, message: 'Unauthorized'})

    return res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username
    })
  })


};
