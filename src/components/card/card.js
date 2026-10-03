export function createCard({ pairId, color, onClick }) {
  const card = document.createElement("button");
  card.className = "card";
  card.type = "button";
  card.dataset.pairId = pairId;
  card.dataset.color = color;
  card.setAttribute("aria-label", "Memory card");

  const inner = document.createElement("span");
  inner.className = "card_inner";

  const back = document.createElement("span");
  back.className = "card_face card_back";

  const front = document.createElement("span");
  front.className = "card_face card_front";

  const circle = document.createElement("span");
  circle.className = "card_circle";
  circle.style.backgroundColor = color;

  front.append(circle);
  inner.append(back, front);
  card.append(inner);

  card.addEventListener("click", () => onClick(card));

  return card;
}
