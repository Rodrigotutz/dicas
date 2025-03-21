"use server"

export async function getTinyKey() {
    const key = await  process.env.TINY_MCE_API_KEY
    return
}