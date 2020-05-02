import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

export class MailerService {
  templateForgetPassword(token: string): any {
    const resetLink = `${process.env.URL_FRONT}/reset-password/${token}`;

    return {
      subject: 'Recuperação de senha',
      text: `Site para recuperar senha: ${resetLink}`,
      html: `<br>Site para recuperar senha: <a href="https://${resetLink}" target="_blank">${resetLink}`,
    };
  }
  async sendEmail(sendTo: string, template: any) {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'https://developers.google.com/oauthplayground',
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: sendTo,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    await transporter.sendMail(mailOptions);
  }
}
