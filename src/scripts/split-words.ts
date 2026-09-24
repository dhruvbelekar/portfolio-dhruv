/*
  Wraps every word inside `root` in its own span so words can be animated one
  at a time.

  It walks the DOM rather than taking a string because the copy it is pointed
  at carries inline highlight spans: splitting `textContent` would flatten all
  of that into one run and lose the colours. Each word stays inside whatever
  element it came from, so it keeps the styling it already had.
*/
export function splitWords(root: HTMLElement, className: string): HTMLElement[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent && node.textContent.trim()) texts.push(node as Text);
  }

  const words: HTMLElement[] = [];
  for (const text of texts) {
    const frag = document.createDocumentFragment();
    // Whitespace goes back as its own node so wrapping, spacing and selection
    // behave exactly as they did before the split.
    for (const piece of text.textContent!.split(/(\s+)/)) {
      if (!piece) continue;
      if (!piece.trim()) {
        frag.appendChild(document.createTextNode(piece));
        continue;
      }
      const span = document.createElement("span");
      span.className = className;
      span.textContent = piece;
      frag.appendChild(span);
      words.push(span);
    }
    text.replaceWith(frag);
  }
  return words;
}
