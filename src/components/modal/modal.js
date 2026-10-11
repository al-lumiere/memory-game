export function createModal () {
  const dialog = document.createElement("dialog");
  dialog.className = "modal";

  const content = document.createElement("div");
  content.className = "modal_content";

  dialog.append(content);

  function open() {
    dialog.showModal();
    document.body.classList.add("modal-open");
  }

  function close() {
    dialog.close();
  }

  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      close();
    }
  });

  return {
    element: dialog,
    content,
    open,
    close,
  };
}