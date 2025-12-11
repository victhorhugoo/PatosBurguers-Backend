import { Router, RequestHandler } from "express";
import { prisma } from "../libs/prisma";
import { sendEmail } from "../libs/mailtrap";
import path from "path";

export const routes = Router();

// Rota de teste
routes.get('/ping', (req, res) => {
    res.json({ pong: true });
});

// enviar email
const brindeEmail: RequestHandler = async (req, res) => {
    const { email } = req.body;
    await sendEmail(email, 'Seu BRINDE!', ' Agradecemos pelo seu feedback!' )

    console.log(email);
    res.json({success: true});
};
routes.post('/send-email', brindeEmail);
 

// Rota para receber os dados do formulário Delivery
routes.post('/deliveryform', async (req, res) => {
    try {
        let { nome, email, telefone, avaliacao1, avaliacao2, avaliacao3, avaliacao4, comentario, brindeResgatado } = req.body;

        // Tratar múltiplas seleções de checkboxes
        if (Array.isArray(avaliacao1)) {
            avaliacao1 = avaliacao1.join(',');
        }
        if (Array.isArray(avaliacao2)) {
            avaliacao2 = avaliacao2.join(',');
        }
        if (Array.isArray(avaliacao3)) {
            avaliacao3 = avaliacao3.join(',');
        }

        // Verificando o último resgate de brinde
        const ultimaRespostaComBrinde = await prisma.respostasDelivery.findFirst({
            where: {
                email,
                brindeResgatado: {
                    not: undefined,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        let podeResgatarBrinde = true;
        if (ultimaRespostaComBrinde) {
            const agora = new Date();
            const dataUltimoBrinde = ultimaRespostaComBrinde.brindeResgatado;
            if (dataUltimoBrinde) {
                const diferencaMilissegundos = agora.getTime() - dataUltimoBrinde.getTime();
                const diferencaDias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));

                if (diferencaDias < 30) {
                    podeResgatarBrinde = false;
                }
            }
        }

        const novaResposta = await prisma.respostasDelivery.create({
            data: {
                nome,
                email,
                telefone,
                avaliacao1,
                avaliacao2,
                avaliacao3,
                avaliacao4,
                comentario,
                brindeResgatado: podeResgatarBrinde ? new Date() : undefined,
            },
        });

        if (podeResgatarBrinde) {
            await sendEmail(
                email,
                'Seu BRINDE chegou!',
                `Olá ${nome}, obrigado pelo seu feedback! 🎉 
                
                Aqui está o seu brinde, venha resgatar com a gente!`);
            res.json({ success: true, message: 'obrigado pelo seu feedback! Brinde resgatado com sucesso!' });
        } else {
            res.json({ success: true, message: 'Obrigado pelo seu feedback!' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro ao salvar a resposta.' });
    }
});

// Rota para receber os dados do formulário Salão
routes.post('/salaoform', async (req, res) => {
    try {
        let { nome, email, telefone, avaliacao1, avaliacao2, avaliacao3, avaliacao4, comentario, brindeResgatado } = req.body;

        // Tratar múltiplas seleções de checkboxes
        if (Array.isArray(avaliacao1)) {
            avaliacao1 = avaliacao1.join(',');
        }
        if (Array.isArray(avaliacao2)) {
            avaliacao2 = avaliacao2.join(',');
        }
        if (Array.isArray(avaliacao3)) {
            avaliacao3 = avaliacao3.join(',');
        }

        // Verificando o último resgate de brinde
        const ultimaRespostaComBrinde = await prisma.respostasSalao.findFirst({
            where: {
                email,
                brindeResgatado: {
                    not: undefined,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        let podeResgatarBrinde = true;
        if (ultimaRespostaComBrinde) {
            const agora = new Date();
            const dataUltimoBrinde = ultimaRespostaComBrinde.brindeResgatado;
            if (dataUltimoBrinde) {
                const diferencaMilissegundos = agora.getTime() - dataUltimoBrinde.getTime();
                const diferencaDias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));

                if (diferencaDias < 30) {
                    podeResgatarBrinde = false;
                }
            }
        }

        const novaResposta = await prisma.respostasSalao.create({
            data: {
                nome,
                email,
                telefone,
                avaliacao1,
                avaliacao2,
                avaliacao3,
                avaliacao4,
                comentario,
                brindeResgatado: podeResgatarBrinde ? new Date() : undefined,
            },
        });

        if (podeResgatarBrinde) {
            await sendEmail(
                email,
                'Seu BRINDE chegou!',
                `Olá ${nome}, obrigado pelo seu feedback! 🎉 
                
                Aqui está o seu brinde, venha resgatar com a gente!`);
            res.json({ success: true, message: 'Brinde resgatado com sucesso! Obrigado pelo seu feedback!' });
        } else {
            res.json({ success: true, message: 'Obrigado pelo seu feedback!' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro ao salvar a resposta.' });
    }
});

