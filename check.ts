import { prisma } from './lib/prisma';
import { hash } from "bcryptjs";

async function main() {
  try {
    const AI_EMAIL = "ai@medconnect.com";
    const AI_PMDC = "AI-BOT";
    const userId = "clxzzzzzzzzzzzzzzzzzzzzzz"; // valid cuid format

    let aiBot = await prisma.doctor.findUnique({
      where: { email: AI_EMAIL }
    });

    console.log("Found aiBot:", !!aiBot);

    if (!aiBot) {
      console.log("Trying to create aiBot...");
      const hashedPassword = await hash("random_secure_password_ai_bot_123", 10);
      aiBot = await prisma.doctor.create({
        data: {
          fullName: "Medical Chatbot",
          email: AI_EMAIL,
          pmdcNumber: AI_PMDC,
          phoneNumber: "1111111111", // Changed from 0000000000
          password: hashedPassword,
          isVerified: true,
          verificationStatus: "VERIFIED",
          specialization: "Artificial Intelligence",
          bio: "I am an advanced Medical AI assistant...",
          profileImage: "https://api.dicebear.com/7.x/bottts/svg?seed=MedicalAI&backgroundColor=4f46e5"
        }
      });
      console.log("Successfully created aiBot with id:", aiBot.id);
    }

    console.log("Attempting to find existing conversation...");
    const existingConversations = await prisma.conversation.findMany({
      where: {
        AND: [
          { participants: { some: { doctorId: userId } } },
          { participants: { some: { doctorId: aiBot.id } } },
        ]
      },
      select: { id: true }
    });

    console.log("existingConversations:", existingConversations);

  } catch (error) {
    console.error("PRISMA ERROR IS:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
