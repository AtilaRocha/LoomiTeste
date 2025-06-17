import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { EmailTemplateParams } from 'src/shared/utils/interface/email-template';

@Injectable()
export class SendgridEmailService {
  private readonly logger = new Logger(SendgridEmailService.name);

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendRegisterationEmail(data: EmailTemplateParams): Promise<boolean> {
    const msg = {
      to: data.to_email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: 'Confirm your registration',
      text: `Hello ${data.to_name}, confirm your account here: ${data.message}`,
      html: `<p>Hello <strong>${data.to_name}</strong>,</p>
             <p>Click the link below to confirm your account:</p>
             <a href="${data.message}">${data.message}</a>`,
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Registration email sent to ${data.to_email}`);
      return true;
    } catch (error) {
      this.logger.error('Failed to send email via SendGrid', error);
      return false;
    }
  }
}
