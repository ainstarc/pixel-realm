export function createMenuButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = "ui";
  Object.assign(button.style, {
    padding: "8px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    marginBottom: "4px"
  });

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  });
  button.addEventListener("click", onClick);

  return button;
}