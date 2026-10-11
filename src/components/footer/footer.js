export function createFooter(githubURL) {
  const footer = document.createElement("footer");
  footer.className = "footer";

  const link = document.createElement("a");
  link.className = "footer_link";
  link.href = githubURL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Aliaksandra — GitHub 🔗";

  footer.append(link);

  return footer;
}