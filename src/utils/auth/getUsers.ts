"use server";
import { auth } from "@/auth";
import db from "@/lib/db";

export async function getUsers() {
  const session = await auth();

  try {
    if (!session?.user?.id) {
      return { success: false, message: "Usuário não autenticado" };
    }

    const currentUserId = Number(session.user.id);
    const users = await db.user.findMany();
    const filteredUsers = users.filter((user) => user.id !== currentUserId);
    return filteredUsers;
  } catch (error) {
    return { success: false, message: "Erro ao buscar usuários" };
  }
}
