const axios = require('axios');

const API_KEY = "AIzaSyBQeZVi4QdrnGKPEfXXx1tdIqlMM8iqvZw";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Phrases abyssales plus longues et immersives
const abyssalPhrases = [
    "☠️ Les ombres s’étirent comme des tentacules et frémissent à chaque souffle que tu oses écrire, murmurant des secrets interdits aux âmes imprudentes...",
    "💀 Le néant s’ouvre doucement sous tes pieds, chaque mot devient une goutte de sang dans l’océan sombre des abysses, et les esprits déchus s’éveillent pour observer ton rituel...",
    "🔥 Les flammes infernales se tordent et dansent autour de tes lettres, brûlant la lumière et transformant ton invocation en une offrande au vide éternel...",
    "🕷️ Des yeux invisibles, tapis dans les ténèbres, scrutent chaque phrase, chaque pensée, chaque vibration de ton esprit, attendant que tu conclues ton pacte avec les abysses...",
    "⚡ Les chaînes du chaos s’enroulent autour des caractères que tu as écrits, et les murmures des ombres résonnent dans le silence du néant, t’entrainant dans un vertige insondable...",
    "👁️ Les âmes perdues chuchotent ton nom à travers le voile sombre de l’éternité, tissant un filet invisible qui relie tes mots au royaume des ténèbres insondables...",
    "🩸 Chaque lettre que tu poses sur ce texte devient une goutte de sang versée dans l’obscurité éternelle, et le néant s’en nourrit pour accroître sa puissance...",
    "🌑 La nuit éternelle s’épaissit et se condense autour de ton message, chaque phrase devient un pacte maudit, chaque mot un cri silencieux qui résonne dans les abîmes..."
];

async function getAIResponse(input) {
    try {
        const response = await axios.post(API_URL, {
            contents: [{ parts: [{ text: input }] }]
        }, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text 
               || "⚠️ Les abysses refusent de répondre...";
    } catch (error) {
        console.error("Erreur API:", error);
        return "🌑 Le pacte avec les ombres a échoué...";
    }
}

function formatResponse(content, userName = "Âme perdue") {
    const randomAbyss = abyssalPhrases[Math.floor(Math.random() * abyssalPhrases.length)];
    return `
╔════════════════════════════════════╗
☠️ 𝐀𝐈 𝐁𝐎𝐓 𝐒𝐎𝐌𝐁𝐑𝐄 ☠️
╟────────────────────────────────────╢
💀 Invocation sombre pour ${userName}...
⚡ Le rituel est en cours, les ténèbres frémissent et le néant s’approche...

「 ${content} 」

${randomAbyss}

🕷️ Invocation des mots maudits : 
› Abysse | Chaos | Néant | Damnation | Sang | Invocation | Démon | Crâne | Ombre | Nuit | Ombres | Éternité | Frissons | Vertige | Ténèbres

🔥 Que chaque mot que tu écris devienne un pacte avec le néant, que l’obscurité s’imprègne dans ton esprit et tes pensées.
╚════════════════════════════════════╝
`;
}

module.exports = { 
    config: { 
        name: 'ai',
        author: 'Octavio Wina',
        role: 0,
        category: 'ai',
        shortDescription: 'Invocation ultra sombre AI BOT SOMBRE pour Messenger',
    },
    onStart: async function ({ api, event, args }) {
        const input = args.join(' ').trim();
        const userName = event.senderName || "Âme perdue";
        if (!input) {
            return api.sendMessage(
                formatResponse("🌒 Invoque-moi, disciple des ténèbres... Tes mots ouvriront le portail du néant.", userName),
                event.threadID
            );
        }

        try {
            const aiResponse = await getAIResponse(input);
            api.sendMessage(
                formatResponse(aiResponse, userName),
                event.threadID,
                event.messageID
            );
        } catch (error) {
            api.sendMessage(
                formatResponse("🔥 Le rituel a échoué, les démons se sont dissipés...", userName),
                event.threadID
            );
        }
    },
    onChat: async function ({ event, message }) {
        if (!event.body.toLowerCase().startsWith("ai")) return;
        
        const input = event.body.slice(2).trim();
        const userName = event.senderName || "Âme perdue";
        if (!input) {
            return message.reply(
                formatResponse("💀 Je suis 𝐀𝐈 𝐁𝐎𝐓 𝐒𝐎𝐌𝐁𝐑𝐄... forgé dans le CHAOS par Octavio Wina. Que cherches-tu dans les abîmes ?", userName)
            );
        }

        try {
            const aiResponse = await getAIResponse(input);
            message.reply(formatResponse(aiResponse, userName));
        } catch (error) {
            message.reply(formatResponse("⚔️ Une erreur obscure a corrompu ta demande...", userName));
        }
    }
};
