import nodemailer from "nodemailer";
import {} from "dotenv/config";

const createTrans = () => {
const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: "apikey",
          pass: process.env.API_KEY
        }
  });
  return transport;
};

const template = (data) => {
  return `
    <div>
    <label>Nombre: </label><label>${data.name}</label>
    </div>
    <div>
    <label>Apellido: </label><label>${data.lastName}</label>
    </div>
    <div>
    <label>Telefono: </label><label>${data.phone}</label>
    </div>
    <div>
    <label>País: </label><label>${data.country}</label>
    </div>
    <div>
    <label>Estado/Provincia: </label><label>${data.state}</label>
    </div>
    <div>
    <label>Ciudad: </label><label>${data.city}</label>
    </div>
    <div>
    <label>Area: </label><label>${data.area}</label>
    </div>
    <div>
    <label>Programa: </label><label>${data.program}</label>
    </div>
    <div>
    <label>Comentarios: </label><label>${data.comments}</label>
    </div>
    `;
};
export const sendMail = async (data) => {
  try {
    const transporter = createTrans();
    const info = await transporter.sendMail({
      from: `"Kevin Andrade" <${process.env.SENDER_EMAIL}>`,
      to: `${data.email}`,
      subject: `Hola ${data.name}, tu formulario fue recibido con éxito`,
      html: template(data),
    });
    return "Mensaje enviado: %s" +info.messageId;
  } catch (error) {
    console.log(error);
  }
};
