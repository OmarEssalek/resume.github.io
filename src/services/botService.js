class BotService {
  constructor() {
    this.responses = [
      "C'est une excellente question ! Voici quelques conseils pour améliorer votre productivité...",
      "Je comprends votre demande. Laissez-moi vous expliquer cela en détail...",
      "Voici ce que je peux vous suggérer à ce sujet...",
      "Intéressant ! Voici mon point de vue sur cette question...",
      "Excellente idée ! Je vais vous aider avec cela...",
      "Bien sûr, je peux vous expliquer cela de manière simple...",
      "Voici quelques idées créatives pour vous...",
      "Merci pour votre question ! Voici ma réponse détaillée...",
      "C'est un sujet passionnant ! Permettez-moi de vous éclairer...",
      "Je vais vous donner des conseils pratiques sur ce point..."
    ];
  }

  async generateResponse(userMessage) {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const message = userMessage.toLowerCase();
    
    // Réponses contextuelles basées sur le contenu du message
    if (message.includes('productivité') || message.includes('efficace')) {
      return `Pour améliorer votre productivité, je recommande :
      
• Utilisez la technique Pomodoro (25 min de travail, 5 min de pause)
• Priorisez vos tâches avec la matrice d'Eisenhower
• Éliminez les distractions (notifications, réseaux sociaux)
• Planifiez votre journée la veille
• Automatisez les tâches répétitives

Quelle méthode souhaitez-vous essayer en premier ?`;
    }
    
    if (message.includes('résume') || message.includes('texte')) {
      return `Pour résumer efficacement un texte, voici ma méthode :

• Lisez le texte en entier une première fois
• Identifiez les idées principales de chaque paragraphe
• Relevez les mots-clés et concepts importants
• Structurez votre résumé en 3 parties : introduction, développement, conclusion
• Utilisez vos propres mots tout en gardant le sens original

N'hésitez pas à me partager le texte que vous souhaitez résumer !`;
    }
    
    if (message.includes('concept') || message.includes('explique')) {
      return `Je serais ravi de vous expliquer un concept difficile ! Ma méthode :

• Je décompose le concept en éléments simples
• J'utilise des analogies du quotidien
• Je donne des exemples concrets
• J'explique étape par étape
• Je m'assure que vous avez bien compris

Quel concept souhaitez-vous que je vous explique ?`;
    }
    
    if (message.includes('repas') || message.includes('cuisine')) {
      return `Voici une idée de repas délicieux et équilibré :

🍽️ **Saumon grillé aux légumes de saison**
• Filet de saumon grillé aux herbes
• Légumes grillés (courgettes, poivrons, aubergines)
• Quinoa aux épices
• Sauce au yaourt et citron

⏱️ Temps de préparation : 20 minutes
🥗 Alternative végétarienne : Remplacer le saumon par du tofu mariné

Avez-vous des préférences alimentaires ou des restrictions ?`;
    }
    
    if (message.includes('bonjour') || message.includes('salut')) {
      return `Bonjour ! Je suis YAKIN, votre assistant IA. Je suis là pour vous aider dans de nombreux domaines :

• Répondre à vos questions
• Expliquer des concepts complexes
• Vous donner des conseils pratiques
• Résumer des textes
• Générer des idées créatives

Comment puis-je vous aider aujourd'hui ?`;
    }
    
    if (message.includes('aide') || message.includes('help')) {
      return `Je peux vous aider avec :

📚 **Éducation & Apprentissage**
• Expliquer des concepts difficiles
• Résumer des textes
• Aide aux devoirs

💼 **Productivité & Travail**
• Conseils de productivité
• Organisation des tâches
• Gestion du temps

🍳 **Vie quotidienne**
• Idées de recettes
• Conseils pratiques
• Résolution de problèmes

Que souhaitez-vous faire ?`;
    }
    
    if (message.includes('merci')) {
      return `De rien ! Je suis ravi de pouvoir vous aider. N'hésitez pas à me poser d'autres questions si vous en avez besoin. 😊`;
    }
    
    // Réponses par défaut
    const randomResponses = [
      `Votre question est très intéressante ! Pouvez-vous me donner plus de détails pour que je puisse vous aider au mieux ?`,
      `Je comprends votre demande. Laissez-moi réfléchir à la meilleure façon de vous répondre...`,
      `C'est un sujet passionnant ! Pouvez-vous préciser quel aspect vous intéresse le plus ?`,
      `Excellente question ! Pour vous donner une réponse complète, j'aurais besoin de quelques précisions...`,
      `Je vais faire de mon mieux pour vous aider. Pouvez-vous reformuler votre question ou me donner plus de contexte ?`
    ];
    
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  }
}

export const botService = new BotService();