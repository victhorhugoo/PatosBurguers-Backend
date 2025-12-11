import { MailtrapClient } from "mailtrap";
import { email } from "zod";

export const sendEmail = async (to: string, subject: string, body: string) => {
    const options = {
        token: process.env.MAILTRAP_TOKEN as string
        
    };

    const mailtrap = new MailtrapClient(options);

    try {
        await mailtrap.send({
            from: { name: 'Patos Burguers', email: 'hugomx800@gmail.com'},
            to: [{ email: to }],
            subject,
            text: body,
            html: body
        });

        return true;
    } catch(err) {
        return false;
    }
}