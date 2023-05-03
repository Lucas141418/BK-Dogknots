const nodemailer = require("nodemailer");

// Sender of email
const originEmail = "infosistemasica@gmail.com";

// configurations of email
const smtOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: originEmail,
    pass: "uhntfrvdblxjtxxq",
  },
};

async function sendEmail(pEmailData) {
  console.log("Sending email...", pEmailData);
  const transporter = nodemailer.createTransport({ ...smtOptions });
  const { email, password } = pEmailData;

  try {
    await transporter.sendMail({
      from: originEmail,
      subject: "Datos de rigistros SICA",
      to: email,
      html: `<h1>Datos de registro SICA</h1>
      <p>Email: <strong>${email}</strong></p></p>
      <p>Password: <strong>${password}</strong></p>`,
    });
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}

async function sendEmailRecovery(pEmailData) {
  console.log("Sending recovery email password...", pEmailData);
  const transporter = nodemailer.createTransport({ ...smtOptions });
  const { email, password } = pEmailData;

  try {
    await transporter.sendMail({
      from: originEmail,
      subject: "Recuperación de contraseña SICA",
      to: email,
      html: `<h1>Recuperación de contraseña SICA</h1>
            <p> Contraseña nueva <strong>${password}</strong></p>
            <p>Para la cuenta asociada al correo electrónico <strong>${email}</strong></p>.`,
    });
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}

async function changedUser(pEmailData) {
  console.log("Sending email...", pEmailData);
  const transporter = nodemailer.createTransport({ ...smtOptions });
  const { email, state, password, role } = pEmailData;

  try {
    await transporter.sendMail({
      from: originEmail,
      subject: "Usuario aceptado en el sistema SICA",
      to: email,
      html: `<h1>Usuario aceptado en el sistema SICA</h1>
      <p>Estado: <strong>${state} </strong></p>
      <p> Su contraseña temporal es: <strong>${password}</strong></p>
      <p> Bienvenido al sistema SICA</p>
      <p> Su rol es ${role}</p>`,
    });
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}

//enviar correo de solicitud de traslado
async function sendEmailTransfer(pEmailData) {
  console.log("Sending transfer email...", pEmailData);
  const transporter = nodemailer.createTransport({ ...smtOptions });
  const { email, transferId, assetId, assetName, decision } = pEmailData;

  try {
    await transporter.sendMail({
      from: originEmail,
      subject: "Respuesta sobre solicitud de traslado.",
      to: email,
      html: `<h1>Respuesta sobre su solicitud de traslado.</h1>
          <p> Su solicitud de traslado con id <strong>${transferId}</strong> sobre el activo <strong>${assetName}</strong> con id <strong>${assetId}</strong> fue <strong>${decision}</strong>. </p>
          <p>Por favor comunicarse con jefatura en caso de cualquier inconveniente.</p>.`,
    });
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendEmail,
  sendEmailRecovery,
  sendEmailTransfer,
  changedUser,
};
