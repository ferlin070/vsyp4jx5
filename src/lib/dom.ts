/**
 * DOM helpers — query and event utilities.
 */

/** Query a single element (shorthand for querySelector with type cast). */
export function $<T extends HTMLElement = HTMLElement>(sel: string, parent: ParentNode = document): T | null {
  return parent.querySelector<T>(sel);
}

/** Query all elements (returns a real array, not NodeList). */
export function $$<T extends HTMLElement = HTMLElement>(sel: string, parent: ParentNode = document): T[] {
  return Array.from(parent.querySelectorAll<T>(sel));
}

/** Delegate an event to elements matching a selector. */
export function delegate(
  eventType: string,
  selector: string,
  handler: (target: HTMLElement, event: Event) => void,
  parent: ParentNode = document,
): () => void {
  const listener = (event: Event) => {
    const target = (event.target as HTMLElement)?.closest<HTMLElement>(selector);
    if (target) handler(target, event);
  };
  (parent as Document | Element).addEventListener(eventType, listener);
  return () => (parent as Document | Element).removeEventListener(eventType, listener);
}

/** Create an element from an HTML string (returns the first child). */
export function html(el: string, htmlString: string): HTMLElement {
  const container = document.createElement(el);
  container.innerHTML = htmlString.trim();
  return container.firstElementChild as HTMLElement;
}
