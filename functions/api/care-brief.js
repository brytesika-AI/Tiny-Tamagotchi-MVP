import { getStructuredCareCard, normalizePet } from "../../src/petRules.js";

export async function onRequestPost(context) {
  try {
    const payload = await context.request.json();
    const pet = normalizePet(payload);
    return Response.json({
      ok: true,
      card: getStructuredCareCard(pet)
    });
  } catch {
    return Response.json(
      {
        ok: false,
        error: "Send JSON with hunger, happiness, energy, state, and evolved fields."
      },
      { status: 400 }
    );
  }
}
